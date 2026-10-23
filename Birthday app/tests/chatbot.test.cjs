const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const project = path.join(__dirname, '..');
const source = fs.readFileSync(path.join(project, 'src/index.html'), 'utf8');
const output = fs.readFileSync(path.join(project, 'output/index.html'), 'utf8');
const approvedQa = JSON.parse(fs.readFileSync(path.join(project, 'input/birthday_book_chatbot_approved_qa.json'), 'utf8'));
const embeddedMatch = output.match(/<script type="application\/json" id="approvedQaData">([\s\S]*?)<\/script>/);
assert.ok(embeddedMatch, 'approved Q&A data is embedded in the standalone HTML');
const embeddedQa = JSON.parse(embeddedMatch[1]);
const inlineScript = output.match(/<script>([\s\S]*?)<\/script>/);
assert.ok(inlineScript, 'app JavaScript is inline');
const script = inlineScript[1].split('\n');
const helperNames = ['normalizeChatQuestion', 'findApprovedChatItem', 'buildChatReply'];
const helpers = helperNames.map(name => {
  const line = script.find(line => line.startsWith(`function ${name}(`));
  assert.ok(line, `${name} exists in standalone app`);
  return line;
}).join('\n');
const { findApprovedChatItem, buildChatReply } = new Function('approvedQa', `${helpers}\nreturn { findApprovedChatItem, buildChatReply };`)(embeddedQa);

test('embedded Q&A matches the approved JSON exactly', () => {
  assert.deepEqual(embeddedQa, approvedQa);
  assert.equal(embeddedQa.approval_status, 'user_approved');
  assert.ok(embeddedQa.items.every(item => item.approved === true));
});

test('all approved-answer questions return their approved wording', () => {
  const items = approvedQa.items.filter(item => item.response_mode === 'approved_answer');
  assert.ok(items.length > 0);
  for (const item of items) {
    assert.equal(findApprovedChatItem(item.question).id, item.id);
    assert.equal(buildChatReply(item.question, false).text, item.answer);
  }
  assert.equal(findApprovedChatItem('  HOW DO I ADD A BIRTHDAY?!  ').id, 'app.add_birthday');
});

test('unknown questions return the approved fallback', () => {
  const reply = buildChatReply('Can you call my friend?', false);
  assert.equal(reply.text, approvedQa.fallback_answer);
  assert.equal(reply.awaitingContext, false);
});

test('AI-follow-up topics request context without claiming generated AI is active', () => {
  const item = approvedQa.items.find(x => x.response_mode === 'ai_followup');
  const prompt = buildChatReply(item.question, false);
  assert.ok(prompt.text.startsWith(item.answer));
  assert.match(prompt.text, /AI-generated responses are not enabled/i);
  assert.equal(prompt.awaitingContext, true);
  const contextReply = buildChatReply('A funny message for my sister', prompt.awaitingContext);
  assert.match(contextReply.text, /cannot create suggestions/i);
  assert.equal(contextReply.awaitingContext, false);
});

test('chat submit interactions leave birthday data unchanged and make no network calls', () => {
  const birthdays = [{ id: 'one', name: 'Existing person', month: 4, day: 8 }];
  const before = JSON.stringify(birthdays);
  const lines = ['normalizeChatQuestion', 'findApprovedChatItem', 'buildChatReply', 'appendChatMessage', 'handleChatSubmit'].map(name => {
    const line = script.find(line => line.startsWith(`function ${name}(`));
    assert.ok(line, `${name} exists in standalone app`);
    return line;
  }).join('\n');
  const messages = [];
  const nodes = {
    chatInput: { value: '', focus() {} },
    chatMessages: { append(message) { messages.push(message); }, scrollHeight: 0, scrollTop: 0 }
  };
  const documentStub = { createElement() { return { className: '', textContent: '' }; } };
  const getNode = id => nodes[id];
  const submit = new Function('approvedQa', 'document', '$', `let awaitingChatContext=false;${lines};return handleChatSubmit;`)(embeddedQa, documentStub, getNode);
  function ask(question) {
    nodes.chatInput.value = question;
    let prevented = false;
    submit({ preventDefault() { prevented = true; } });
    assert.equal(prevented, true);
    assert.equal(nodes.chatInput.value, '');
  }
  ask('How do I see upcoming birthdays?');
  ask('Help me plan a birthday.');
  ask('Dinner at home for my sister, budget $40.');
  assert.equal(messages.length, 6);
  assert.equal(messages[1].textContent, approvedQa.items.find(x => x.id === 'app.upcoming_birthdays').answer);
  assert.match(messages[3].textContent, /AI-generated responses are not enabled/i);
  assert.match(messages[5].textContent, /cannot create suggestions/i);
  assert.equal(JSON.stringify(birthdays), before);
  const chatFunctions = script.filter(line => /^(function (normalizeChatQuestion|findApprovedChatItem|buildChatReply|appendChatMessage|handleChatSubmit|initChatbot))/.test(line)).join('\n');
  assert.doesNotMatch(chatFunctions, /\b(fetch|XMLHttpRequest|localStorage|records)\b/);
  assert.doesNotMatch(source, /\bfetch\s*\(|\bXMLHttpRequest\b/);
});

test('empty submissions add no message and repeated questions return repeated answers', () => {
  const lines = ['normalizeChatQuestion', 'findApprovedChatItem', 'buildChatReply', 'appendChatMessage', 'handleChatSubmit'].map(name => {
    const line = script.find(line => line.startsWith(`function ${name}(`));
    assert.ok(line, `${name} exists in standalone app`);
    return line;
  }).join('\n');
  const messages = [];
  const nodes = {
    chatInput: { value: '', focus() {} },
    chatMessages: { append(message) { messages.push(message); }, scrollHeight: 0, scrollTop: 0 }
  };
  const submit = new Function('approvedQa', 'document', '$', `let awaitingChatContext=false;${lines};return handleChatSubmit;`)(embeddedQa, { createElement() { return { className: '', textContent: '' }; } }, id => nodes[id]);
  submit({ preventDefault() {} });
  assert.equal(messages.length, 0);
  nodes.chatInput.value = 'How do I back up my birthdays?';
  submit({ preventDefault() {} });
  nodes.chatInput.value = 'How do I back up my birthdays?';
  submit({ preventDefault() {} });
  assert.equal(messages.length, 4);
  assert.equal(messages[1].textContent, approvedQa.items.find(x => x.id === 'data.backup').answer);
  assert.equal(messages[3].textContent, messages[1].textContent);
});

test('existing birthday actions and storage key remain in the app', () => {
  for (const id of ['addBtn', 'importBtn', 'exportBtn', 'birthdayList', 'search', 'categoryFilter', 'birthdayForm', 'editBtn', 'celebrateBtn', 'confirmImport']) {
    assert.match(output, new RegExp(`id="${id}"`));
  }
  assert.match(output, /birthday-book-records-v1/);
  assert.match(output, /function persist\(/);
  assert.match(output, /function load\(/);
  assert.match(output, /\$\('birthdayForm'\)\.onsubmit=save/);
  assert.match(output, /\$\('search'\)\.oninput=render/);
  assert.match(output, /\$\('categoryFilter'\)\.onchange=render/);
  assert.match(output, /\$\('exportBtn'\)\.onclick=exportBackup/);
  assert.match(output, /\$\('importBtn'\)\.onclick/);
  assert.match(output, /function beginImport\(/);
  assert.match(output, /function confirmImport\(/);
  assert.match(output, /\.chatbot-toggle\{position:fixed;/);
  assert.match(output, /\.chatbot-panel\{position:fixed;right:22px;bottom:82px;/);
  assert.equal(source, output);
});

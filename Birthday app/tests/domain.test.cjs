const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const html = fs.readFileSync(path.join(__dirname, '../output/index.html'), 'utf8');
const inlineScript = html.match(/<script>([\s\S]*?)<\/script>/);
assert.ok(inlineScript, 'app JavaScript is inline');
const lines = inlineScript[1].split('\n');
const names = ['dateFor', 'validDate', 'isLeap', 'sanitizeRecord', 'occurrence', 'dayDiff', 'age'];
const uidLine = lines.find(x => x.startsWith('const uid='));
assert.ok(uidLine, 'uid helper exists in standalone app');
const declarations = [uidLine, ...names.map(name => {
  const line = lines.find(x => x.startsWith(`function ${name}(`));
  assert.ok(line, `function ${name} exists in standalone app`);
  return line;
})].join('\n');
const domain = new Function(`${declarations}\nreturn { validDate, occurrence, dayDiff, age, sanitizeRecord };`)();
const fixedToday = new Date(2026, 0, 1, 12);

test('accepts February 29 but rejects impossible calendar dates', () => {
  assert.equal(domain.validDate(2, 29), true);
  assert.equal(domain.validDate(4, 31), false);
  assert.equal(domain.validDate(13, 1), false);
});

test('moves year-end birthdays to the next calendar year', () => {
  const next = domain.occurrence({ month: 1, day: 1 }, new Date(2025, 11, 31, 12));
  assert.equal(next.getFullYear(), 2026);
  assert.equal(next.getMonth(), 0);
  assert.equal(domain.dayDiff(new Date(2025, 11, 31, 12), next), 1);
});

test('observes leap-day birthdays on February 28 in non-leap years', () => {
  const next = domain.occurrence({ month: 2, day: 29 }, new Date(2025, 1, 27, 12));
  assert.equal(next.getMonth(), 1);
  assert.equal(next.getDate(), 28);
  const leap = domain.occurrence({ month: 2, day: 29 }, new Date(2028, 1, 27, 12));
  assert.equal(leap.getDate(), 29);
});

test('calculates current age only after this year birthday', () => {
  assert.equal(domain.age({ birthYear: 1990, month: 1, day: 1 }, fixedToday), 36);
  assert.equal(domain.age({ birthYear: 1990, month: 1, day: 2 }, fixedToday), 35);
  assert.equal(domain.age({ birthYear: null }, fixedToday), null);
  assert.equal(domain.age({ birthYear: 2027 }, fixedToday), null);
});

test('rejects malformed imported birthdays and accepts a valid unknown-year record', () => {
  assert.equal(domain.sanitizeRecord({ name: 'A', month: 4, day: 31 }), null);
  assert.equal(domain.sanitizeRecord({ name: 'Future', month: 1, day: 1, birthYear: 2100 }), null);
  const valid = domain.sanitizeRecord({ name: '  Alex  ', month: 2, day: 29 });
  assert.equal(valid.name, 'Alex');
  assert.equal(valid.birthYear, null);
});

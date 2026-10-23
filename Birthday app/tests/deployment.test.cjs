const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');
const config = JSON.parse(fs.readFileSync(path.join(root, 'vercel.json'), 'utf8'));
const dashboardPath = path.join(root, 'Presentation/birthday_app_ai_orchestrator_workflow.html');
const dashboard = fs.readFileSync(dashboardPath, 'utf8');
const sourcePath = path.join(root, 'src/index.html');
const outputPath = path.join(root, 'output/index.html');

function route(pathname) {
  return config.rewrites.find(rule => rule.source === pathname)?.destination;
}

test('Vercel static config maps the root and app routes to existing HTML', () => {
  assert.equal(config.buildCommand, null);
  assert.equal(config.outputDirectory, '.');
  assert.equal(route('/'), '/Presentation/birthday_app_ai_orchestrator_workflow.html');
  assert.equal(route('/birthday'), '/src/index.html');
  assert.equal(route('/birthday/'), '/src/index.html');
  for (const pathname of ['/', '/birthday', '/birthday/']) {
    const dest = route(pathname);
    assert.ok(fs.existsSync(path.join(root, dest.slice(1))), `destination exists for ${pathname}`);
  }
});

test('dashboard CTA targets /birthday online and the app by relative path when opened locally', () => {
  assert.match(dashboard, /id="openBirthdayApp" href="\/birthday"/);
  assert.match(dashboard, /location\.protocol==="file:"\)birthdayAppLink\.href="\.\.\/src\/index\.html"/);
  const localTarget = path.resolve(path.dirname(dashboardPath), '../src/index.html');
  assert.equal(localTarget, sourcePath);
  assert.ok(fs.existsSync(localTarget));
});

test('dashboard phases, gate checklist, export, and starter prompt remain present', () => {
  assert.match(dashboard, /const phases=\[/);
  assert.match(dashboard, /aria-label="Seven workflow phases"/);
  assert.match(dashboard, /const gateLabels=\[/);
  assert.match(dashboard, /id="exportBtn"/);
  assert.match(dashboard, /id="promptBtn"/);
  assert.equal((dashboard.match(/\{n:"0[1-7]",title:/g) || []).length, 7);
});

test('app source and standalone output remain unchanged and synchronized', () => {
  const src = fs.readFileSync(sourcePath);
  const output = fs.readFileSync(outputPath);
  assert.deepEqual(output, src);
  assert.match(src.toString(), /approvedQaData/);
  assert.match(src.toString(), /function persist\(/);
  assert.match(src.toString(), /function load\(/);
});

test('ignore rules exclude environment and credential files while allowing placeholder example', () => {
  for (const filename of ['.gitignore', '.vercelignore']) {
    const ignore = fs.readFileSync(path.join(root, filename), 'utf8').split(/\r?\n/).map(x => x.trim());
    assert.ok(ignore.includes('.env'), `${filename} excludes .env`);
    assert.ok(ignore.includes('.env.*'), `${filename} excludes .env.*`);
    assert.ok(ignore.includes('!.env.example'), `${filename} permits a placeholder example`);
    assert.ok(ignore.includes('.vercel/'));
    assert.ok(ignore.includes('*.pem'));
    assert.ok(ignore.includes('*.key'));
    assert.ok(ignore.includes('credentials.json'));
    assert.ok(ignore.includes('secrets/'));
    // Exercise only the ignore patterns; do not open or inspect any actual environment file.
    const ignored = name => name === '.env' || (name.startsWith('.env.') && name !== '.env.example');
    assert.equal(ignored('.env'), true);
    assert.equal(ignored('.env.production'), true);
    assert.equal(ignored('.env.example'), false);
  }
});

import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const kit = resolve(root, 'official-kit/site-generator-speed-01-run-20261122-kit');
const practice = JSON.parse(readFileSync(resolve(kit, 'practice/input/cases.json'), 'utf8'));
const reference = await import(resolve(kit, 'baselines/makefun-site/vendor/makefun-site/index.js'));
let candidateRun;
let candidateImportError;
try {
  ({ run: candidateRun } = await import(resolve(root, 'solve.js')));
} catch (error) {
  candidateImportError = error;
}

test('candidate exports run(input)', () => {
  assert.equal(typeof candidateRun, 'function', candidateImportError?.message ?? 'missing run export');
});

if (typeof candidateRun === 'function') {
  for (const item of practice) {
    test(`practice case ${item.id} matches makefun-site 1.0.0`, () => {
      assert.deepStrictEqual(candidateRun(item.input), reference.build(item.input));
    });
  }
}

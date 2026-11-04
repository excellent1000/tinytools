import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const bin = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'bin', 'tinytools.js');
const run = (...args) => execFileSync(process.execPath, [bin, ...args], { encoding: 'utf8' }).trim();

test('b64 roundtrip', () => {
  assert.equal(run('b64', 'enc', 'hello tinytools'), 'aGVsbG8gdGlueXRvb2xz');
  assert.equal(run('b64', 'dec', 'aGVsbG8gdGlueXRvb2xz'), 'hello tinytools');
});

test('hash defaults to sha256', () => {
  assert.equal(
    run('hash', 'abc'),
    'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad',
  );
});

test('hash supports md5', () => {
  assert.equal(run('hash', 'md5', 'abc'), '900150983cd24fb0d6963f7d28e17f72');
});

test('uuid prints a v4 uuid', () => {
  assert.match(run('uuid'), /^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/);
});

test('ts converts ms timestamp to ISO', () => {
  assert.equal(run('ts', '1700000000000'), '2023-11-14T22:13:20.000Z');
});

test('ts converts date string to ms', () => {
  assert.equal(run('ts', '2023-11-14T22:13:20Z'), '1700000000000');
});

test('rand stays in range', () => {
  const n = Number(run('rand', '1', '5'));
  assert.ok(Number.isInteger(n) && n >= 1 && n <= 5);
});

test('help lists commands and exits 0', () => {
  assert.match(run('help'), /b64|hash|uuid/);
});

test('unknown command fails with nonzero exit', () => {
  assert.throws(() => run('nope'), /unknown command/);
});

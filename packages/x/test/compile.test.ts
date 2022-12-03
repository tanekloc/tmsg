import { compile } from '../src/compile.js';
import { afterEach, beforeEach, describe, it } from 'node:test';
import path from 'path';
import fs from 'fs';
import os from 'os';
import assert from 'assert/strict';
import glob from 'glob';

describe('compile', () => {
  let tmpDir: string;

  beforeEach(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'tmsg'));
  });

  afterEach(() => {
    fs.rmSync(tmpDir, { recursive: true });
  });

  it('it should work', async () => {
    const inputDir = path.join('test', 'fixtures', 'basic-project', 'locales/');
    compile(inputDir, tmpDir);

    const files = glob.sync(tmpDir + '/**/*.js');
    const basenames = files.map((f) => path.basename(f));
    assert.deepEqual(basenames, ['en.js']);
    for (const f of files) {
      assert.equal(
        fs.readFileSync(f, 'utf-8'),
        '\nexport default {\n  HELLO: () => "HELLO"\n}',
      );
    }
  });
});

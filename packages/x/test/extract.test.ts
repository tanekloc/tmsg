import { extract } from '../src/extract.js';
import { afterEach, beforeEach, describe, it } from 'node:test';
import path from 'path';
import fs from 'fs';
import os from 'os';
import assert from 'assert/strict';
import glob from 'glob';

describe('extract', () => {
  let tmpDir: string;

  beforeEach(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'tmsg'));
  });

  afterEach(() => {
    fs.rmSync(tmpDir, { recursive: true });
  });

  it('it should work', async () => {
    const inputDir = path.join('test', 'fixtures', 'basic-project');
    extract(tmpDir, inputDir);

    const files = glob.sync(tmpDir + '/**/*.json');
    const basenames = files.map((f) => path.basename(f));
    assert.deepEqual(basenames, ['de.json', 'en.json']);
    for (const f of files) {
      assert.equal(
        fs.readFileSync(f, 'utf-8'),
        '{\n  "Hello world {%url}!": "Hello world {url}!"\n}',
      );
    }
  });
});

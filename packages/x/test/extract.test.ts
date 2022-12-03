import { extract, mergeMessages } from '../src/extract.js';
import { afterEach, beforeEach, describe, it } from 'node:test';
import path from 'path';
import fs from 'fs';
import os from 'os';
import assert from 'assert/strict';
import glob from 'glob';

describe('extract', () => {
  describe('e2e', async () => {
    let tmpDir: string;

    beforeEach(() => {
      tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'tmsg'));
    });

    afterEach(() => {
      fs.rmSync(tmpDir, { recursive: true });
    });

    it('it should work', async () => {
      const inputDir = path.join('test', 'fixtures', 'basic-project');
      extract(tmpDir, inputDir, ['en', 'de']);

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

  describe('merge', async () => {
    it('keeps existing messages', async () => {
      const existing = {
        test: 'test1',
      };
      const extracted = {
        test: 'test2',
      };
      assert.deepEqual(mergeMessages(existing, extracted), {
        test: 'test1',
      });
    });
    it('adds new messages', async () => {
      const existing = {
        test: 'test1',
      };
      const extracted = {
        test: 'test1',
        test2: 'test2',
      };
      assert.deepEqual(mergeMessages(existing, extracted), {
        test: 'test1',
        test2: 'test2',
      });
    });
    it('removes old messages', async () => {
      const existing = {
        test: 'test1',
      };
      const extracted = {};
      assert.deepEqual(mergeMessages(existing, extracted), {});
    });
  });
});

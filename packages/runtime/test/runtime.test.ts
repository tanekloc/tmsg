import url from 'url';
import path from 'path';
import { Runtime } from '../src/runtime.js';
import { equal } from 'assert/strict';
import { describe, it } from 'node:test';

describe('Runtime', () => {
  it('should load ESM modules at runtime ', async () => {
    const localesURL = url.pathToFileURL(
      path.join(process.cwd(), 'test', 'fixtures', 'basic-project', 'locales/'),
    );
    const storage = new Runtime(localesURL);
    const locales = await storage.load('en');
    equal(Object.keys(locales).length, 3);
    const fn = locales['Hello']!;
    equal(fn({}), 'Hello');
  });
});

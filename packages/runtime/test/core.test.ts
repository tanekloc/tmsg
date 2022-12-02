import { configure } from '../src/core.js';
import { equal } from 'assert/strict';
import { describe, it } from 'node:test';
import url from 'url';
import path from 'path';

describe('t', () => {
  it('it should work ', async () => {
    const localesURL = url.pathToFileURL(
      path.join(process.cwd(), 'test', 'fixtures', 'basic-project', 'locales/'),
    );
    const t = await configure({
      locales: ['en'],
      rootURL: localesURL,
    }).buildT('en');
    equal(t(`Hello`), 'Hello');
    equal(
      t(`Hello {%ARG1}`, {
        ARG1: 'test',
      }),
      'Hello test',
    );
    equal(
      t('Hello {%ARG1} {%ARG1} {%ARG3}', {
        ARG1: 'test1',
        ARG3: 'test3',
      }),
      'Hello test1 test1 test3',
    );
  });
});

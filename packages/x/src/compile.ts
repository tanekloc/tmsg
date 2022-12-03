import path from 'path';
import glob from 'glob';
import fs from 'fs';

import MessageFormat from '@messageformat/core';
import compileModule from '@messageformat/core/lib/compile-module.js';
import { normalizePath } from './utils.js';

export function compile(localesDir: string, outDir: string) {
  localesDir = normalizePath(localesDir);
  outDir = normalizePath(outDir);
  const files = glob.sync(localesDir + '**/*.json');
  for (const file of files) {
    const locale = path.basename(file).split('.').shift() as string;
    const data = JSON.parse(fs.readFileSync(file, 'utf-8'));
    const mf = new MessageFormat(locale);
    const msgModule = compileModule(mf, data);
    fs.mkdirSync(path.join(outDir, locale), { recursive: true });
    fs.writeFileSync(path.join(outDir, locale, `${locale}.js`), msgModule);
  }
}

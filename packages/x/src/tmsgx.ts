#!/usr/bin/env node

import yargs from 'yargs';
import { extract } from './extract.js';
import { compile } from './compile.js';

yargs(process.argv.slice(2))
  .scriptName('tmsgx')
  .usage('$0 <cmd> [args]')
  .command(
    'sync',
    'Extract strings from a TypeScript project',
    (yargs) => {
      yargs.option('outDir', {
        type: 'string',
        describe: 'The target directory to write the messages to.',
      });
      yargs.option('projectDir', {
        type: 'string',
        describe: 'The target directory to write the messages to.',
      });
      yargs.option('locales', {
        type: 'array',
        describe: 'Locale files to generate.',
      });
    },
    function (argv) {
      extract(
        argv['outDir'] as string,
        argv['projectDir'] as string,
        argv['locales'] as string[],
      );
    },
  )
  .command(
    'compile',
    'Compiles strings to ES modules',
    (yargs) => {
      yargs.option('outDir', {
        type: 'string',
        describe: 'The target directory to write the messages to.',
      });
      yargs.option('localesDir', {
        type: 'string',
        describe: 'The directory where .json files are located.',
      });
    },
    function (argv) {
      compile(argv['localesDir'] as string, argv['outDir'] as string);
    },
  )
  .help().argv;

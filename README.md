# tmsg

A TypeScript-based, type-safe internationalization (i18n) library. tmsg is largely compatible with MessageFormat.

## Problem

When translating text strings in a TypeScript app, it is possible for parameters to be undefined or misnamed, leading to errors:

```ts
const myString = 'Hello, {NAME}!';
console.log(translate(myString, { NAME: 'Tanek' }));
```

Over time, the app grows, the code is changed, and an `undefined` gets passed instead of the name. Or perhaps the `NAME` is renamed to `FIRST_NAME` in the parameter's list but you forget to update the string.

## Solution

To use tmsg, install the `@tmsg/runtime` package:

```sh
npm i @tmsg/runtime --save
```

Declare your strings with the t function, using the [MessageFormat](http://messageformat.github.io/messageformat/) syntax, with the addition of a `%` character to indicate string parameters:

```ts
import { configure } from '@tmsg/runtime';

// Configure your locale and where the locales are stored.
const i18n = configure({
  locales: ['en', 'de'],
  rootURL: pathToFileURL(process.cwd() + '/dist/locales/'),
});

// Get a locale-specific `t` function.
const t = await i18n.buildT('en');

console.log(t('Hello, {%NAME}!', { NAME: 'Tanek' })); // compiles.
console.log(t('Hello, Tanek!', { NAME: 'Tanek' })); // TypeScript error!
console.log(t('Hello, {%NAME}!', { FIRST_NAME: 'Tanek' })); // TypeScript error!
console.log(t('Hello, {%NAME}!', { NAME: undefined })); // TypeScript error!
```

The [`@tmsg/x`](/packages/x) CLI can be used to automatically extract strings from your codebase and export them to JSON files, as well as compile translations back to JavaScript:

```sh
# Extracts strings from the code base to JSON files.
tmsgx sync --outDir ./locales --projectDir .
# Compile translations to ESM.
tmsgx compile --outDir ./dist/locales --localesDir ./locales
```

## Limitations

- The `t` function must be used for the CLI to extract strings.

## [Example projects](/examples/)

1. [`express`](/examples/express)

## Roadmap

- [x] Merge new strings with old strings during extraction.
- [ ] Configure the name of the `t` function.
- [ ] More example projects.
- [ ] Improve parsing of arguments and see if it's possible to get rid of the required `%` character.

# tmsg - type-safe i18n library for TypeScript

> Based on and largely compatible with [MessageFormat](http://messageformat.github.io/messageformat/).

## Problem

In your app, you have strings that need translating. Some of the strings are actually templates. So you define a string like this:

```ts
const myString = 'Hello, {NAME}!'.console.log(
  i18n(myString, { NAME: 'Tanek' }),
);
```

Eventually the code gets changed, and an `undefined` gets passed as the name. Or perhaps the `NAME` is renamed to `FIRST_NAME` but you forget to update the string.

## Solution

```sh
npm i @tmsg/runtime --save
```

Declare your strings inline, together with the string paremeters, using the [MessageFormat](http://messageformat.github.io/messageformat/) with a little addition of the `%` character to indicate parameters:

```ts
import { configure } from '@tmsg/runtime';

const i18n = configure({
  locales: ['en', 'de'],
  rootURL: pathToFileURL(process.cwd() + '/dist/locales/'),
});

const t = await i18n.buildT('en');

console.log(t('Hello, {%NAME}!', { NAME: 'Tanek' })); // compiles
console.log(t('Hello, Tanek!', { NAME: 'Tanek' })); // TypeScript error!
console.log(t('Hello, {%NAME}!', { FIRST_NAME: 'Tanek' })); // TypeScript error!
console.log(t('Hello, {%NAME}!', { NAME: undefined })); // TypeScript error!
```

Use the [`@tmsg/x`](/packages/x) CLI to automatically find all strings in your code base, export them to JSON files and compile translations back to JavaScript:

```sh
# Extracts strings from the code base to JSON files.
tmsgx sync --outDir ./locales --projectDir .
# Compile translations to ESM.
tmsgx compile --outDir ./dist/locales --localesDir ./locales
```

## Limitations

- Using the function called `t` is important for the CLI to be able to extract strings.

## [Example projects](/examples/)

1. [`express`](/examples/express)

## Roadmap

- [x] Merge new strings with old strings during extraction.
- [ ] Configure the name of the `t` function.
- [ ] More example projects.
- [ ] Improve parsing of arguments and see if it's possible to get rid of the required `%` character.

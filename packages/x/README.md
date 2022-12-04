# @tmsg/x

`@tmsg/x` is the command line interface (CLI) for the [tmsg](https://github.com/tanekloc/tmsg) internationalization (i18n) library for TypeScript apps.

[Docs](https://github.com/tanekloc/tmsg/blob/main/README.md) | [Changelog](https://github.com/tanekloc/tmsg/tree/main/packages/runtime)

## Installation

To use `@tmsg/x`, install the package:

```sh
npm i @tmsg/x --save-dev
```

## Usage

The `@tmsg/x` CLI can be used to automatically extract strings from your codebase and export them to JSON files, as well as compile translations back to JavaScript:

```sh
# Extracts strings from the code base to JSON files.
tmsgx sync --outDir ./locales --projectDir .
# Compile translations to ESM.
tmsgx compile --outDir ./dist/locales --localesDir ./locales
```

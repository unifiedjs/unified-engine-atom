# unified-engine-atom

[![Build][build-badge]][build]
[![Downloads][downloads-badge]][downloads]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]
[![Chat][chat-badge]][chat]

[**unified**][unified] engine to create an [Atom Linter][linter]s for a
[processor][unified-processor].
Wrapper around the [`unifiedjs/unified-engine`][engine] to run it from Atom.

## Install

[npm][]:

```sh
npm install unified-engine-atom
```

## Use

```js
var engine = require('unified-engine-atom')

module.exports.provideLinter = linter

function linter() {
  return {
    grammarScopes: ['source.gfm', 'source.pfm', 'text.md'],
    name: 'remark',
    scope: 'file',
    lintsOnChange: true,
    lint: engine({
      processor: require('remark'),
      rcName: '.remarkrc',
      packageField: 'remarkConfig',
      ignoreName: '.remarkignore',
      pluginPrefix: 'remark'
    })
  }
}
```

## API

### `engine(options)`

Create a `lint` function for use in an AtomLinter package.
Read more about linters in the [Linter Docs][docs].

##### `options`

###### [`options.processor`][processor]

unified processor to transform files ([`Processor`][unified-processor],
required).

###### [`options.rcName`][rc-name]

Name of configuration files to load (`string`, optional).

###### [`options.packageField`][package-field]

Property at which configuration can be found in `package.json` files (`string`,
optional).

###### [`options.detectConfig`][detect-config]

Whether to search for configuration files (`boolean`, default: whether `rcName`
or `packageField` is given).

###### [`options.rcPath`][rc-path]

File-path to a configuration file to load (`string`, optional).

###### [`options.settings`][settings]

Configuration for the parser and compiler of the processor (`Object`, optional).

###### [`options.ignoreName`][ignore-name]

Name of ignore files to load (`string`, optional).

###### [`options.detectIgnore`][detect-ignore]

Whether to search for ignore files (`boolean`, default: whether
`ignoreName` is given).

###### [`options.ignorePath`][ignore-path]

File-path to an ignore file to load (`string`, optional).

###### [`options.ignorePathResolveFrom`][ignore-path-resolve-from]

Whether to resolve patterns in `ignorePath` relative to its directory or the
current working directory  (`'dir'` or `'cwd'`, default: `'dir'`).

###### [`options.ignorePatterns`][ignore-patterns]

Extra patterns to ignore in combination with `ignorePath` or found ignores
(`Array.<string>`, optional).

###### [`options.silentlyIgnore`][silently-ignore]

Skip given files if they are ignored (`boolean`, default: `false`).

###### [`options.plugins`][plugins]

Map of plugin names or paths and options to use (`Object`, optional).

###### [`options.pluginPrefix`][plugin-prefix]

When given, optional prefix to use when searching for plugins (`string`,
optional).

###### [`options.configTransform`][config-transform]

Transform config files from a different schema (`Function`, optional).

##### Returns

`Function` — Can be used as `provider.lint`, where `provider` is the returned
value of `provideLinter`.
This function takes an Atom `Editor` instance, resolves an array of
[`LinterMessages`][messages], or rejects a fatal `Error`.

## Todo

*   [ ] If anyone knows how to add coverage to Atom tests, I’d love to
    hear about it.

## Contribute

See [`contributing.md`][contributing] in [`unifiedjs/.github`][health] for ways
to get started.
See [`support.md`][support] for ways to get help.

This project has a [code of conduct][coc].
By interacting with this repository, organization, or community you agree to
abide by its terms.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[build-badge]: https://github.com/unifiedjs/unified-engine-atom/workflows/main/badge.svg

[build]: https://github.com/unifiedjs/unified-engine-atom/actions

[downloads-badge]: https://img.shields.io/npm/dm/unified-engine-atom.svg

[downloads]: https://www.npmjs.com/package/unified-engine-atom

[sponsors-badge]: https://opencollective.com/unified/sponsors/badge.svg

[backers-badge]: https://opencollective.com/unified/backers/badge.svg

[collective]: https://opencollective.com/unified

[chat-badge]: https://img.shields.io/badge/chat-discussions-success.svg

[chat]: https://github.com/unifiedjs/unified/discussions

[npm]: https://docs.npmjs.com/cli/install

[health]: https://github.com/unifiedjs/.github

[contributing]: https://github.com/unifiedjs/.github/blob/HEAD/contributing.md

[support]: https://github.com/unifiedjs/.github/blob/HEAD/support.md

[coc]: https://github.com/unifiedjs/.github/blob/HEAD/code-of-conduct.md

[license]: license

[author]: https://wooorm.com

[unified]: https://github.com/unifiedjs/unified

[engine]: https://github.com/unifiedjs/unified-engine

[linter]: https://github.com/steelbrain/linter

[docs]: https://github.com/steelbrain/linter/tree/HEAD/docs

[messages]: https://github.com/steelbrain/linter/blob/HEAD/docs/types/linter-message-v2.md

[unified-processor]: https://github.com/unifiedjs/unified#processor

[processor]: https://github.com/unifiedjs/unified-engine/blob/HEAD/doc/options.md#optionsprocessor

[detect-config]: https://github.com/unifiedjs/unified-engine/blob/HEAD/doc/options.md#optionsdetectconfig

[rc-name]: https://github.com/unifiedjs/unified-engine/blob/HEAD/doc/options.md#optionsrcname

[package-field]: https://github.com/unifiedjs/unified-engine/blob/HEAD/doc/options.md#optionspackagefield

[rc-path]: https://github.com/unifiedjs/unified-engine/blob/HEAD/doc/options.md#optionsrcpath

[settings]: https://github.com/unifiedjs/unified-engine/blob/HEAD/doc/options.md#optionssettings

[detect-ignore]: https://github.com/unifiedjs/unified-engine/blob/HEAD/doc/options.md#optionsdetectignore

[ignore-name]: https://github.com/unifiedjs/unified-engine/blob/HEAD/doc/options.md#optionsignorename

[ignore-path]: https://github.com/unifiedjs/unified-engine/blob/HEAD/doc/options.md#optionsignorepath

[ignore-path-resolve-from]: https://github.com/unifiedjs/unified-engine/blob/HEAD/doc/options.md#optionsignorepathresolvefrom

[ignore-patterns]: https://github.com/unifiedjs/unified-engine/blob/HEAD/doc/options.md#optionsignorepatterns

[silently-ignore]: https://github.com/unifiedjs/unified-engine/blob/HEAD/doc/options.md#optionssilentlyignore

[plugin-prefix]: https://github.com/unifiedjs/unified-engine/blob/HEAD/doc/options.md#optionspluginprefix

[plugins]: https://github.com/unifiedjs/unified-engine/blob/HEAD/doc/options.md#optionsplugins

[config-transform]: https://github.com/unifiedjs/unified-engine/blob/HEAD/doc/options.md#optionsconfigtransform

# unified-engine-atom [![Build Status][travis-badge]][travis]

Interface for creating [Atom Linter][linter]s around
[**unified**][unified] processors.  Wrapper around the
[**engine**][engine] to run it from Atom.

## Installation

[npm][]:

```bash
npm install unified-engine-atom
```

## Usage

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

Create a `lint` function for use in an AtomLinter package.  Read more
about linters in the [Linter Docs][docs].

##### `options`

###### [`options.processor`][processor]

Unified processor to transform files ([`Processor`][unified-processor],
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

###### [`options.silentlyIgnore`][silently-ignore]

Skip given files if they are ignored (`boolean`, default: `false`).

###### [`options.plugins`][plugins]

Map of plug-in names or paths and options to use (`Object`, optional).

###### [`options.pluginPrefix`][plugin-prefix]

When given, optional prefix to use when searching for plug-ins (`string`,
optional).

##### Returns

`Function` — Can be used as `provider.lint`, where `provider` is the
returned value of `provideLinter`.  This function takes an Atom `Editor`
instance, resolves an array of [`LinterMessages`][messages], or rejects
a fatal `Error`.

## Todo

*   [ ] If anyone knows how to add coverage to Atom tests, I’d love to
    hear about it.

## Contribute

See [`contributing.md` in `unifiedjs/unified`][contributing] for ways to get
started.

This organisation has a [Code of Conduct][coc].  By interacting with this
repository, organisation, or community you agree to abide by its terms.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[travis-badge]: https://img.shields.io/travis/unifiedjs/unified-engine-atom.svg

[travis]: https://travis-ci.org/unifiedjs/unified-engine-atom

[npm]: https://docs.npmjs.com/cli/install

[license]: LICENSE

[author]: http://wooorm.com

[unified]: https://github.com/unifiedjs/unified

[engine]: https://github.com/unifiedjs/unified-engine

[linter]: https://github.com/steelbrain/linter

[docs]: https://github.com/steelbrain/linter/tree/master/docs

[messages]: https://github.com/steelbrain/linter/blob/master/docs/types/linter-message-v2.md

[unified-processor]: https://github.com/unifiedjs/unified#processor

[processor]: https://github.com/unifiedjs/unified-engine/blob/master/doc/options.md#optionsprocessor

[detect-config]: https://github.com/unifiedjs/unified-engine/blob/master/doc/options.md#optionsdetectconfig

[rc-name]: https://github.com/unifiedjs/unified-engine/blob/master/doc/options.md#optionsrcname

[package-field]: https://github.com/unifiedjs/unified-engine/blob/master/doc/options.md#optionspackagefield

[rc-path]: https://github.com/unifiedjs/unified-engine/blob/master/doc/options.md#optionsrcpath

[settings]: https://github.com/unifiedjs/unified-engine/blob/master/doc/options.md#optionssettings

[detect-ignore]: https://github.com/unifiedjs/unified-engine/blob/master/doc/options.md#optionsdetectignore

[ignore-name]: https://github.com/unifiedjs/unified-engine/blob/master/doc/options.md#optionsignorename

[ignore-path]: https://github.com/unifiedjs/unified-engine/blob/master/doc/options.md#optionsignorepath

[silently-ignore]: https://github.com/unifiedjs/unified-engine/blob/master/doc/options.md#optionssilentlyignore

[plugin-prefix]: https://github.com/unifiedjs/unified-engine/blob/master/doc/options.md#optionspluginprefix

[plugins]: https://github.com/unifiedjs/unified-engine/blob/master/doc/options.md#optionsplugins

[contributing]: https://github.com/unifiedjs/unified/blob/master/contributing.md

[coc]: https://github.com/unifiedjs/unified/blob/master/code-of-conduct.md

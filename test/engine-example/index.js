'use strict';

var engine = require('../..');

module.exports.provideLinter = linter;

function linter() {
  return {
    grammarScopes: ['source.gfm', 'source.pfm', 'text.md'],
    name: 'remark',
    scope: 'file',
    lintOnFly: true,
    lint: engine({
      processor: require('../../node_modules/remark'),
      rcName: '.remarkrc',
      packageField: 'remarkConfig',
      ignoreName: '.remarkignore',
      pluginPrefix: 'remark'
    })
  };
}

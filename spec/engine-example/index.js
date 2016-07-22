/**
 * @author Titus Wormer
 * @copyright 2016 Titus Wormer
 * @license MIT
 * @module unified-engine-atom:engine-example
 * @fileoverview Example set-up to use for remark.
 */

'use strict';

/* Dependencies. */
var engine = require('../..');

/* Expose. */
module.exports.provideLinter = linter;

/**
 * Provider.
 *
 * @return {LinterConfiguration}
 */
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

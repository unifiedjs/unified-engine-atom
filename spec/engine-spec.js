/**
 * @author Titus Wormer
 * @copyright 2016 Titus Wormer
 * @license MIT
 * @module unified-engine-atom
 * @fileoverview Test suite for `unified-engine-atom`.
 */

'use strict';

/* global atom, waitsForPromise */
/* eslint-env jasmine */

/* Dependencies. */
var path = require('path');
var lint = require('./engine-example');

var join = path.join;

/* Tests. */
describe('unified-engine-atom', function () {
  it('should work', function () {
    atom.workspace.destroyActivePaneItem();

    waitsForPromise(function () {
      return Promise.resolve()
        .then(function () {
          return atom.packages.activatePackage(
            join(__dirname, 'engine-example')
          );
        })
        .then(function () {
          return atom.packages.activatePackage('language-gfm');
        })
        .then(function () {
          return atom.workspace.open(
            join(path.resolve(__dirname, '..'), 'readme.md')
          );
        })
        .then(function (editor) {
          return lint.provideLinter().lint(editor);
        })
        .then(function (messages) {
          expect(messages.length).toBe(0);
        })
        .then(function () {
          return atom.workspace.open(
            join(__dirname, 'fixtures', 'invalid.md')
          );
        })
        .then(function (editor) {
          return lint.provideLinter().lint(editor);
        })
        .then(function (messages) {
          expect(
            messages.map(flatten).join('\n')
          ).toBe([
            '<span class="badge badge-flexible">remark-lint:' +
              'no-consecutive-blank-lines</span> Remove 1 line ' +
              'before node',
            '<span class="badge badge-flexible">remark-validate-links' +
              '</span> Link to unknown heading: <code>heading</code>'
          ].join('\n'));
        })
        .then(function () {
          expect(true).toBe(true);
        });
    });
  });
});

function flatten(message) {
  return message.html || message.text;
}

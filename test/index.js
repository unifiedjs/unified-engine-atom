'use strict'

/* global atom */

var path = require('path')
var test = require('tape')
var lint = require('./engine-example')

var join = path.join

test('unified-engine-atom', function (t) {
  t.plan(2)

  atom.workspace.destroyActivePaneItem()

  Promise.resolve()
    .then(function () {
      return atom.packages.activatePackage(join(__dirname, 'engine-example'))
    })
    .then(function () {
      return atom.packages.activatePackage('language-gfm')
    })
    .then(function () {
      return atom.workspace.open(
        join(path.resolve(__dirname, '..'), 'readme.md')
      )
    })
    .then(function (editor) {
      return lint.provideLinter().lint(editor)
    })
    .then(function (messages) {
      t.equal(messages.length, 0, 'should start out without messages')
    })
    .then(function () {
      return atom.workspace.open(join(__dirname, 'fixtures', 'invalid.md'))
    })
    .then(function (editor) {
      return lint.provideLinter().lint(editor)
    })
    .then(function (messages) {
      t.deepEqual(
        messages.map(flatten),
        [
          'Remove 1 line before node (remark-lint:no-consecutive-blank-lines)',
          'Link to unknown heading: `heading` (remark-validate-links:missing-heading)'
        ],
        'should emit messages'
      )
    })
})

function flatten(message) {
  return message.description || message.excerpt
}

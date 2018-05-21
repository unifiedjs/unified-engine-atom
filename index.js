'use strict'

/* global atom */

var path = require('path')
var PassThrough = require('stream').PassThrough
var xtend = require('xtend')
var findRoot = require('find-root')
var vfile = require('to-vfile')
var engine = require('unified-engine')

var root = process.cwd()

var running = 0

var severities = {
  true: 'error',
  false: 'warning',
  null: 'info',
  undefined: 'info'
}

/* Expose. */
module.exports = atomEngine

/* `lint`. */
function atomEngine(options) {
  return lint

  /* Handle on-the-fly or on-save (depending on the
   * global atom-linter settings) events.
   * See https://github.com/atom-community/linter/wiki/Linter-API#messages */
  function lint(editor) {
    var filePath = editor.getPath()
    var projects = atom.project.getPaths()
    var file = vfile(filePath)
    var matches
    var cwd

    if (!filePath) {
      return Promise.resolve([])
    }

    running++

    /* Set a logical CWD. */
    matches = projects
      /* Keep projects with `filePath` inside. */
      .filter(function(project) {
        return filePath.slice(0, project.length + 1) === project + path.sep
      })
      /* Sort the longest first. */
      .sort(function(left, right) {
        return right.length - left.length
      })

    cwd = matches[0] || path.dirname(filePath)

    try {
      cwd = findRoot(cwd)
    } catch (err) {
      /* Empty */
    }

    return new Promise(executor)

    function executor(resolve, reject) {
      file.contents = editor.getText()

      try {
        process.chdir(cwd)
      } catch (err) {
        /* Empty */
      }

      engine(
        xtend(options, {
          output: false,
          out: false,
          streamError: new PassThrough(),
          streamOut: new PassThrough(),
          files: [file]
        }),
        onrun
      )

      function onrun(err) {
        running--

        if (running === 0) {
          process.chdir(root)
        }

        if (err) {
          reject(err)
        } else {
          resolve(file.messages.map(transform, editor))
        }
      }
    }
  }
}

/* Transform VFile messages nested-tuple. */
function transform(message) {
  var editor = this
  var label = [message.source, message.ruleId].filter(Boolean)
  var excerpt = message.stack || undefined

  if (label[0] && label[0] === label[1]) {
    label.pop()
  }

  label = label.join(':')

  if (!excerpt) {
    excerpt = message.reason.replace(/“([^”]+)”/g, '`$1`')
  }

  if (label) {
    excerpt += ' (' + label + ')'
  }

  return {
    severity: severities[message.fatal],
    location: {
      file: editor.getPath(),
      position: toRange(message.location)
    },
    excerpt: excerpt,
    description: message.note
  }
}

/* Transform a (stringified) vfile range to a linter
 * nested-tuple. */
function toRange(location) {
  var startLine = Number(location.start.line) - 1
  var startColumn = Number(location.start.column) - 1

  return [
    [startLine, startColumn],
    [
      location.end.line ? Number(location.end.line) - 1 : startLine,
      location.end.column ? Number(location.end.column) - 1 : startColumn
    ]
  ]
}

'use strict';

/* global atom */

var path = require('path');
var PassThrough = require('stream').PassThrough;
var xtend = require('xtend');
var findRoot = require('find-root');
var vfile = require('to-vfile');
var engine = require('unified-engine');

/* Expose. */
module.exports = atomEngine;

/* `lint`. */
function atomEngine(options) {
  return lint;

  /* Handle on-the-fly or on-save (depending on the
   * global atom-linter settings) events.
   * See https://github.com/atom-community/linter/wiki/Linter-API#messages */
  function lint(editor) {
    var filePath = editor.getPath();
    var projects = atom.project.getPaths();
    var file = vfile(filePath);
    var original = process.cwd();
    var matches;
    var cwd;

    if (!filePath) {
      return Promise.resolve([]);
    }

    /* Set a logical CWD. */
    matches = projects
      /* Keep projects with `filePath` inside. */
      .filter(function (project) {
        return filePath.slice(0, project.length + 1) === project + path.sep;
      })
      /* Sort the longest first. */
      .sort(function (left, right) {
        return right.length - left.length;
      });

    cwd = matches[0] || path.dirname(filePath);

    try {
      cwd = findRoot(cwd);
    } catch (err) { /* empty */ }

    return new Promise(executor);

    function executor(resolve, reject) {
      file.contents = editor.getText();

      try {
        process.chdir(cwd);
      } catch (err) { /* empty */ }

      engine(xtend(options, {
        output: false,
        out: false,
        streamError: new PassThrough(),
        streamOut: new PassThrough(),
        files: [file]
      }), function (err) {
        process.chdir(original);

        if (err) {
          return reject(err);
        }

        resolve(file.messages.map(transform, editor));
      });
    }
  }
}

/* Transform VFile messages nested-tuple. */
function transform(message) {
  var label = [message.source, message.ruleId].filter(Boolean);
  var excerpt = message.stack || undefined;

  if (label[0] && label[0] === label[1]) {
    label.pop();
  }

  label = label.join(':');

  if (!excerpt) {
    excerpt = message.reason.replace(/“([^”]+)”/g, '`$1`');
  }

  return {
    severity: {
      true: 'error',
      false: 'warning',
      null: 'info',
      undefined: 'info'
    }[message.fatal],
    location: {
      file: this.getPath(),
      position: toRange(message.location)
    },
    excerpt: excerpt + ' (' + label + ')',
    description: message.note
  };
}

/* Transform a (stringified) vfile range to a linter
 * nested-tuple. */
function toRange(location) {
  var result = [[
    Number(location.start.line) - 1,
    Number(location.start.column) - 1
  ]];

  result[1] = [
    location.end.line ? Number(location.end.line) - 1 : result[0][0],
    location.end.column ? Number(location.end.column) - 1 : result[0][1]
  ];

  return result;
}

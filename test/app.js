'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-generator').test;

describe('generator-tower-angular:app', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/app'))
      .withOptions({someOption: true})
      .withPrompts({someAnswer: true})
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
      'dummyfile.txt'
    ]);
  });
});
var project ={
    "templates": [
        "app/index.html",
        "package.json",
        "bower.json",
        ".jshintrc",
        ".jscsrc",
        ".jshintignore",
        ".jsbeautifyrc",
        "README.md",
        "app/components/home/home.html",
        "app/components/home/home-controller.js",
        "app/states/app-states.js",
        "app/app.js",
        "test/e2e/homeSpec.js"
    ],
    "files": [
        ".yo-rc.json",
        ".bowerrc",
        "Gruntfile.js",
        "test",
        "app/styles",
        "config",
        "tasks"
    ],
    "appScripts": [
        "app.js",
        "components/**/*.js",
        "states/**/*.js"
    ]
};

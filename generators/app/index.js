'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var pkg = require("../../package.json");
var fs = require('fs-extra');
var slug = require("underscore.string");
var path = require('path');
var findup = require('findup-sync');

var project ={
    "test":"testueee",
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

module.exports = yeoman.Base.extend({
    scripts: "<%= scripts %>",
    css: "<%= scripts %>",
    moveFiles: function moveFiles(base, files) {
    files =  [
        ".yo-rc.json",
        ".bowerrc",
        "Gruntfile.js",
        "test",
        "app/styles",
        "config",
        "tasks"
    ];
        base = 'C:/projects/generator-tower-angular/generators/app/templates/';
      files.forEach(function (file) { 
          this.fs.copy(
            path.join(base, file),
            this.destinationPath(file)
        );
      }.bind(this));
    },

    moveTemplates: function moveTemplates(base, templates) {
        templates = [
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
    ];
          base = 'C:/projects/generator-tower-angular/generators/app/templates/';
      templates.forEach(function (template) {
                    this.log(base);
          this.log(template);
        this.fs.copyTpl(
            path.join(base, template),
            this.destinationPath(template),
            this
        );
    }.bind(this));
  },   
  initializing: function(){
      
    // determine the app root
      var rootPath = findup('.yo-rc.json');
      this.log("1 "+rootPath);
      rootPath = rootPath ? path.dirname(rootPath) : process.cwd();
      this.log("2 "+rootPath);
      if (rootPath !== process.cwd()) {
        this.log(
          '\n' +
          'Just found a `.yo-rc.json` in a parent directory.\n' +
          'Setting the project root at: ' + rootPath + '\n'
        );
        //process.chdir(rootPath);
      }
  },
  prompting: function () {
    var done = this.async();
      this.log(project.test);
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the scrumtrulescent ' + chalk.red('generator-tower-angular') + ' generator!'
    ));
     this.log(chalk.bgBlack.cyan('\n+-----------------------------------------------------------+\n'+
'XXXXXXXXXXXXX                                               |\n'+
'XXXXXXXXXXXXX                                               |\n'+
'XXXXXXXXXXXXX    XXX            XXX         XXXXXXXXXXXX    |\n'+
'XXXXXXXXXXXXX     XXXX   XX    XXXX         XXX      XXX    |\n'+
'   XXXXXXX  XXXXXX  XXX  XX   XXXX   XXXXX  XXXX     XXX    |\n'+
'+  XXXXXXX XXXXXXXX  XXX XX  XXXX  XXX   XX XXXXXXXXXXXX    |\n'+
'|  XXXXXXX XX    XX  XXXXXXXXXX   XXXXXXXXX XXX   XXXX      |\n'+
'|  XXXXXXX XXXXXXXX     XXXXX    XXX        XXX      XXX    |\n'+
'|           XXXXXX              XXX     XX  XXX        XXX  |\n'+
'|            XXXX                 XXXXXX                    |\n'+
'+----------------------------------------------------------->\n'));  
    var prompts = [{
      type: 'confirm',
      name: 'someOption',
      message: 'Would you like to enable this option?',
      default: true
    }];
      
    this.prompt(prompts, function (props) {
      this.props = props;
      // To access props later use this.props.someOption;
      done();
    }.bind(this));
  },

  writing: function () {     
       //FILES
      this.moveFiles('./templates/', project.files);
      //TEMPLATES
      this.moveTemplates(this.templatePath(), project.templates);
        /*this.fs.copy(
          this.templatePath('dummyfile.txt'),
          this.destinationPath('dummyfile.txt')
        );*/
  },

  install: function () {
    this.installDependencies();
  }
});

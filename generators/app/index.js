'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var pkg = require("../../package.json");
var fs = require('fs-extra');
var slug = require("underscore.string");
var path = require('path');
var findup = require('findup-sync');


module.exports = yeoman.Base.extend({
    moveFiles: function moveFiles() {
    var files =  [
        ".yo-rc.json",
        ".bowerrc",
        "Gruntfile.js",
        "test",
        "app/styles",
        "config",
        "tasks",
        "apimocker"
    ];
      files.forEach(function (file) { 
          this.fs.copy(
            //path.join(base, file),
            this.templatePath(file), 
            this.destinationPath(file)
        );
      }.bind(this));
    },

    moveTemplates: function moveTemplates() {
       var templates = [
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
    this.props.css = '<%= css %>';
    this.props.scripts = '<%= scripts %>';
        
      templates.forEach(function (template) {
            this.fs.copyTpl(
            this.templatePath(template),
            this.destinationPath(template),
            this.props
        );
    }.bind(this));
  },   
  initializing: function(){
      
    // determine the app root
      var rootPath = findup('.yo-rc.json');
      this.log("1 "+this.sourceRoot());
      rootPath = rootPath ? path.dirname(rootPath) : process.cwd();
      this.log("2 "+this.templatePath('Gruntfile.js'));
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
        // Have Yeoman greet the user.
        this.log(chalk.bgBlack.cyan('\n\n\n+-----------------------------------------------------------+\n'+
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
        this.log(chalk.red('generator-tower-angular') + ' Create your angular application project.');
      
        var prompts = [{
            type: 'input',
            name: 'name',
            message: 'Whats your project name',
            //Defaults to the project's folder name if the input is skipped
            default: this.appname
            },{
              type    : 'confirm',
              name    : 'demo',
              message : 'Would you like to enable the demo content?'
            }];
      
        this.prompt(prompts, function (props) {
            this.log(props);
            this.props = props;
          // To access props later use this.props.someOption;
          done();
        }.bind(this));
  },
  configuring: function () {
    if (this.props.demo) {
        this.composeWith("tower-angular:demo", { 
            options: { 
              nested: true, 
              appName: this.props.name
                    } 
         },{local: require.resolve("./../demo")});
     }
  },
  writing: function () {     
       //FILES
      this.moveFiles();
      //TEMPLATES
      this.moveTemplates();

  },

  install: function () {
    this.installDependencies();
  }
});

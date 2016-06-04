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


    moveTemplates: function moveTemplates() {
       var templates = [
        "app/index.html",
        "package.json",
        "bower.json",
        "app/components/grunt/grunt.html",
        "app/components/grunt/grunt-controller.js",
        "app/components/beers/beers.html",
        "app/components/beers/beers-controller.js",
        "app/states/app-states.js",
        "app/app.js",

    ];
    this.props = {};
    this.props.name = this.options.appName || this.appname;
    this.props.css = '<%= css %>';
    this.props.scripts = '<%= scripts %>';
        
      templates.forEach(function (template) {
          this.log(this.templatePath(template));
            this.fs.copyTpl(
            this.templatePath(template),
            this.destinationPath(template),
            this.props
        );
    }.bind(this));
  },   

  prompting: function () {
       /* var done = this.async();
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
        }];
      
        this.prompt(prompts, function (props) {
            this.log(props);
            this.props = props;
          // To access props later use this.props.someOption;
          done();
        }.bind(this));*/
  },

  writing: function () {     
      this.log(chalk.red('\nWriting DEMO content...\n'));
      //TEMPLATES
      this.moveTemplates();

  }
});

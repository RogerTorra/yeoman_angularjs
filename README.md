[![Jenkins](https://img.shields.io/jenkins/s/https/jenkins.qa.ubuntu.com/precise-desktop-amd64_default.svg?maxAge=2592000)](https://www.npmjs.com/package/generator-tower-angular)
[![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)
[![npm](https://img.shields.io/npm/v/npm.svg?maxAge=2592000?style=plastic)](https://www.npmjs.com/package/generator-tower-angular)
[![CocoaPods](https://img.shields.io/cocoapods/l/AFNetworking.svg?maxAge=2592000?style=plastic)](https://www.npmjs.com/package/generator-tower-angular)

Yeoman AngularJS project generator
============

Angularjs project Web 
============

This is the repository of the Yeoman and demo TFG Project. It provides an starting point for an angularJS project


### Quick Start

#### Before you start, tools you will need

* install npm
* bower and grunt (run the following commands):

```script
npm install -g bower

npm install -g grunt

npm install -g yo
```


## Running
*download generator

```script
npm install generator-tower-angular
```

*generating project

```script
yo tower-angular
```

* configure project:

```script
npm install
bower install
```
* run project

Run the application. 

`grunt server`

Run the appliction and open the browser.

`grunt server:open` 

## Testing

Exexecute the following command to launch tests

`grunt test`
 

 Grunt tasks list 
---------------- 

###karma
run karma. (Multitask)
###reloadTasks
override instrumented tasks
###instrument
instruments a file or a directory tree
###jshint
Validate files with JSHint. (Multitask)
###useminPrepare
Using HTML markup as the primary source of information (Multitask)
###server
Serves de application.
###shell
Run shell commands (Multitask)
###watch
Run predefined tasks whenever watched files change.
###concurrent
Run grunt tasks concurrently (Multitask)
###usemin
Replaces references to non-minified scripts / stylesheets (Multitask)
###postcss
Process CSS files. (Multitask)
###rev
Prefix static asset file names with a content hash (Multitask)
###uglify
Minify files with UglifyJS. (Multitask)
###htmlmin
Minify HTML (Multitask)
###cssmin
Minify CSS (Multitask)
###browserSync
Keep your browsers in sync (Multitask)
###jscs
JavaScript Code Style checker (Multitask)
###wiredep
Inject Bower components into your source code. (Multitask)
###includeSource
Include lists of files into your source files automatically. (Multitask)
###bsReload
Custom multi task. (Multitask)
###copy
Copy files. (Multitask)
###concat
Concatenate files. (Multitask)
###sass
Compile Sass to CSS (Multitask)
###coffee
Compile CoffeeScript files into JavaScript (Multitask)
###clean
Clean files and folders. (Multitask)
###default
Alias for "server" task.
###test:unit:auto
Alias for "karma:unit_auto" task.
###distribution
Alias for "dist", "browserSync:dist", "watch" tasks.
###serve
Alias for "clean:server", "concurrent:server", "postcss:css", "browserSync:dev", "jshint:all", "wiredep", "includeSource", "test:dev:unit", "watch" tasks.
###test:dev:unit
Alias for "clean:reports", "karma:unit" tasks.
###test
Alias for "clean:reports", "karma:continuous", "clean:server", "concurrent:server", "postcss:css", "instrument", "browserSync:test", "shell:jasmine2" tasks.
###test:unit
Alias for "clean:reports", "karma:continuous" tasks.
###test:e2e
Alias for "clean:reports", "clean:server", "concurrent:server", "postcss:css", "instrument", "browserSync:test", "shell:jasmine2" tasks.
###doc
Alias for "clean:doc", "docular" tasks.
###dist
Alias for "clean:dist", "concurrent:dist", "postcss:css", "wiredep", "includeSource", "useminPrepare", "concat:generated", "copy:dist", "ngAnnotate", "cssmin:generated", "uglify:generated", "rev", "usemin", "htmlmin" tasks.
###ngAnnotate
Add, remove and rebuild AngularJS dependency injection annotations (Multitask)


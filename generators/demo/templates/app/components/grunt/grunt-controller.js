'use strict';

angular.module('<%= name %>App')

.controller('gruntController',
    function ($log) {
        $log.debug('gruntController loading');
    
        var vm = this;
    
        vm.slide = {};
        vm.next = next;
        vm.back = back;
    
        var index = 0;
        
        function next(){       
            index = index + 1;
            if(index > 7) index = 0;
            vm.slide = _.nth(slides, index);
        }
        function back(){       
            index = index - 1;
            if(index < -7) index = 0;
            vm.slide = _.nth(slides, index);
        }
    
        var slides  = [
            {   
                "name":"apimocker",
                "text":"Runs mock server with passed configuration",
                "code":"'use strict';\n module.exports = {\n options:{  configFile: 'apimocker/config.json' }\n }; "
            },
            {   
                "name":"browserSync",
                "text":"Keep your browsers in sync (Multitask)",
                "code":"'use strict';\n module.exports = {\n    dev: {\n        options: {\n            server: {\n                baseDir: ['./< paths.app >'],\n                middleware: [localProxy] \n            },\n             files: [\n                'app/**/*.js',\n                'app/**/*.html'\n              ],\n            ports: {\n                min: 9000,\n                max: 9100\n            },\n            injectChanges: true\n        }\n    },\n};"
            },
             {   
                "name":"htmlmin",
                "text":"Minify HTML, produce minified html in the dist (Multitask)",
                "code":"'use strict';\n// folder\nmodule.exports = {\n    dist: {\n        options: {\n            removeComments: true,\n            removeCommentsFromCDATA: true,\n            removeCDATASectionsFromCDATA: true,\n            collapseWhitespace: true,\n            //conservativeCollapse: true,\n            collapseBooleanAttributes: true,\n            removeAttributeQuotes: false,\n            removeRedundantAttributes: true,\n            useShortDoctype: true,\n            removeEmptyAttributes: true,\n            removeOptionalTags: true,\n            keepClosingSlash: true,\n        },\n        files: [{\n            expand: true,\n            cwd: '<  paths.dist >',\n            src: [\n                        '*.html',\n                        'components/**/*.html',\n                        'template/**/*.html'\n                    ],\n            dest: '<  paths.dist  >'\n                }]\n    }\n};"
            },
            {   
                "name":"clean",
                "text":"Clean files and folders. (Multitask)",
                "code":"'use strict';\nmodule.exports = {\n    dist: {\n        files: [{\n            dot: true,\n           src: [\n                        'app/styles/css/**',\n                        'app/styles/fonts/**',\n                        'app/resources/i18n/angular**',\n                        '< paths.dist >/*',\n                        '!' + '< paths.dist >/.git*'\n                    ]\n                }]\n    }\n};"
            },
             {   
                "name":"concurrent",
                "text":"Run grunt tasks concurrently, run some tasks in parallel to speed up build process (Multitask)",
                "code":"'use strict';\n module.exports = {\n    server: [\n                'sass',\n                'copy:i18n',\n                'copy:fonts',\n                'copy:themeFonts',\n                'copy:themeImages',\n            ]\n};"
            },
            {   
                "name":"copy",
                "text":"¡Copies remaining files to places other tasks can use (Multitask)",
                "code":"'use strict';\n module.exports = {\n       styles: {\n        expand: true,\n        cwd: '<   paths.app  >' + '/styles',\n        dest: '< paths.app >/styles/css',\n        src: '**/*.css'\n    }\n};"
            },
            {   
                "name":"sass",
                "text":"Compile Sass to CSS and generates necessary files if requested (Multitask)",
                "code":"'use strict';\n// Compiles Sass to CSS \n\nmodule.exports = {\n    options: {\n        sourceMap: true,\n        includePaths: [\n          '< paths.app >/bower_components/bootstrap-sass/assets/stylesheets',\n        ]\n    },\n    server: {\n        files: [{\n            expand: true,\n            cwd: '<  paths.app >/styles/sass',\n            src: '*.{scss,sass}',\n            dest: '< paths.app >/styles/css',\n            ext: '.css'\n               }]\n    }\n};"
            },
            {   
                "name":"wiredep",
                "text":"Inject Bower components into your source code. (Multitask)",
                "code":"'use strict';\n module.exports = {\n    update: {\n        src: ['app/index.html'],\n        options:{\n            'overrides': {\n                'angular': {\n                    'main': [\n                           'angular.min.js'\n                    ]\n                }\n            }\n        }\n    }\n};"
            }
        ];
        
        vm.slide = slides[0];
    
});


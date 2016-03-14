module.exports = function(grunt) {
  'use strict'; 
   // Project configuration.
  grunt.initConfig({
	  // Do grunt-related things in here
	  pkg: grunt.file.readJSON('package.json'),

	 dirs:{
		 root: require('./package.json').appPath,
		 app: require('./package.json').appPath || 'app',
		 reportDir: 'reports',
		 coverage: '<%= dirs.reportDir %>/coverage',
		 e2e: '<%= dirs.coverage %>/e2e',
		 coverageE2E: '<%= dirs.e2e %>',
		 instrumentedE2E: '<%= dirs.e2e %>/instrumented',
		 portal: 'portal',
		 templates: 'templates'
	 }, 

	  
	  jshint: {
		  options: {
			  jshintrc: '.jshintrc',
			  reporter:'jslint',
			  reporterOutput: '<%= dirs.reportDir %>/jshint.xml'
		  },
		  // You get to make the name
		  // The paths tell JSHint which files to validate
		  devFiles: ['app/taskplanner/task-planner.js'],
	  },
	  
	  apimocker: {
			  options:{
				   configFile: 'apimocker/config.json' 
			  }
	  },
	  
	  csslint: {
		dev:{
			src: ['app/taskplanner/taskplanner.css'],
		},
		options: {
			csslintrc: '.csslintrc',
		},
		local: {
			options: {
				formatters: [
					{id: 'compact', dest: '<%= dirs.reportDir %>/csslint.txt'},
					{id: 'lint-xml', dest: '<%= dirs.reportDir %>/csslint.xml'}
				]
			},
			src: ['<%= csslint.dev.src %>'],			
		},
		ci: {
			options: {
				formatters: [{id: 'lint-xml', dest: '<%= dirs.reportDir %>/csslint.xml'}]
			},
			src: ['<%= csslint.dev.src %>'],
		},
		  
		
	  },
	  
	  karma: {
		  options: {
			// point all tasks to karma config file
			configFile: 'karma.conf.js'
		  },
		  unit: {
			// run tests once instead of continuously
			singleRun: true
		  },
		  continuous: {
			// keep karma running in the background
			background: true,
			singleRun: false
		  }
	  },
	  
	  protractor: {
		options: {
			// Location of your protractor config file
			configFile: "protractor.conf.js",

			// Do you want the output to use fun colors?
			noColor: false,
			
			webDriverManagerUpdate:true,

			// Set to true if you would like to use the Protractor command line debugging tool
			// debug: true,

			// Additional arguments that are passed to the webdriver command
			args: { }
		},
		e2e: {
			options: {
			  // Stops Grunt process if a test fails
			  keepAlive: false
			}
		},
		smoke: {
			options: {
				configFile: "protractor.conf.SIT.js",
				// Stops Grunt process if a test fails
				keepAlive: false,
				args: {
					capabilities: {
						browserName: 'phantomjs',
						'phantomjs.binary.path': require('phantomjs').path,
						'phantomjs.ghostdriver.cli.args': ['--loglevel=WARN', '--web-security=no', '--ignore-ssl-errors=yes']
					}
					
					
				}
			}
		},
		smoke_UAT: {
			options: {
				configFile: "protractor.conf.UAT.js",
				// Stops Grunt process if a test fails
				keepAlive: false,
				args: {
					capabilities: {
						browserName: 'phantomjs',
						'phantomjs.binary.path': require('phantomjs').path,
						'phantomjs.ghostdriver.cli.args': ['--loglevel=WARN', '--web-security=no', '--ignore-ssl-errors=yes']
					}
					
					
				}
			}
		},
		
		smoke_chrome: {
			options: {
				configFile: "protractor.conf.SIT.js",
				// Stops Grunt process if a test fails
				keepAlive: false,
				args: {
					capabilities: {
						browserName: 'chrome'
					}
				}

			}
		},
		smoke_ie_sit: {
			options: {
				configFile: "protractor.conf.SIT.ie.js",
				// Stops Grunt process if a test fails
				keepAlive: false,
			}
		},
		smoke_ie_uat: {
			options: {
				configFile: "protractor.conf.UAT.ie.js",
				// Stops Grunt process if a test fails
				keepAlive: false,
			}
		},
		continuous: {
			options: {
			  keepAlive: true
			}
		}
		
	  },
	  watch: {
		  options: {
            atBegin: true,
			livereload: true
		  },
		  karma: {
			files: ['<%=dirs.templates %>/**/*.js', '<%=dirs.templates %>/**/*.html', 'app/**/*.js', 'test/unit/*.js'],
			tasks: ['preprocess:dev', 'karma:continuous:run','checkStyle','preprocess:portal']//'checkStyle', deleted for ERRORS
		  },
		  protractor: {
			files: ['app/**/*.js', 'test/e2e/*.js'],
			tasks: ['protractor:continuous']
		  },
	  },
	  
	  connect: {
			options: {
			   port: 9080,
			   hostname: 'localhost',
			   logger: 'dev',
			   middleware: function (connect, options, defaultMiddleware) {
				 var proxy = require('grunt-connect-proxy/lib/utils').proxyRequest;
				 return [
					proxy
				 ].concat(defaultMiddleware);
			   }
			},
			livereload : { 
							options : {
								keepalive:true,
						}
			},
			proxies:[
			{
						context: '/portalserver/proxy',
						host: '127.0.0.1',
						port: 8001,
						rewrite:{
							'^/portalserver\\/proxy\\?pipe=': '/'
							}
					}
					,{
						context: '/simulator',
						host: '127.0.0.1',
						port: 8001
					}
			],
			test: {
			    options: {
				   // set the location of the application files
				   base: ['.']
			    }
			},
			coverageE2E: {
				options: {
				 // set the location of the application files
				 base: ['<%= dirs.instrumentedE2E %>/']								
			  }
			}
		  },

	  // Empties folders to start fresh
     clean: {
	   all: {
		   src: ['<%= dirs.reportDir %>/']
	   },
		 
       coverageE2E: {
         src: ['<%= dirs.e2e %>/'],
       }
     },	
	 
	copy: {
	  coverageE2E: {
		files: [{
		  expand: true,
		  dot: true,
		  cwd: '<%= dirs.app %>',
		  dest: '<%= dirs.instrumentedE2E %>/app',
		  src: [
			'**/*.{html,css}'
		  ],
		  nonull: true,
		} ,
		{expand: true,
		 cwd: './node_modules',
		 dest: '<%= dirs.instrumentedE2E %>/node_modules',
		 src: [
			'**/angular/**/*',
			'**/angular-mocks/**/*'
		  ],
		  nonull: true,
		},
		{expand: true,
		 cwd: '.',
		 dest: '<%= dirs.instrumentedE2E %>',
		 src: [
			'*.ico',
		  ],
		  nonull: true,
		},
		{expand: true,
		 cwd: '<%= dirs.app %>/bower_components/',
		 dest: '<%= dirs.instrumentedE2E %>/app/bower_components',
		 src: [
			'**/moment/moment.js',
			'**/jquery/dist/jquery.min.js'
		  ],
		  nonull: true,
		},		
		
		]
	  },
	},
	
	instrument: {
		files: ['app/**/task-planner.js'],
		options: {
			lazy: true,
			basePath: '<%= dirs.instrumentedE2E %>/'
		}
	}, 
	protractor_coverage: {
		options: {
			configFile: "protractor.conf.js", // Default config file
			keepAlive: true, // If false, the grunt process stops when the test fails.
			noColor: false, // If true, protractor will not use colors in its output.
			coverageDir: '<%= dirs.instrumentedE2E %>',
			args: {}
	    },
		phantomjs:{
			options: {
				args: {
					baseUrl: 'http://localhost:9080/app/',
					// Arguments passed to the command
					capabilities: {
						browserName: 'phantomjs',
						'phantomjs.binary.path': require('phantomjs').path,
						'phantomjs.ghostdriver.cli.args': ['--loglevel=DEBUG']
					} 
				}
			}
		},
		chrome: {
			options: {
				args: {
					baseUrl: 'http://localhost:9080/app/',
					// Arguments passed to the command
					capabilities:{
						browserName:'chrome'
					}
				}
			}
		},
		ie:{
			options: {
				configFile: "protractor.conf.ie.js",
			}
		},
	},
	
	makeReport: {
	  src: '<%= dirs.instrumentedE2E %>/*.json',
	  options: {
		type: 'html',
		dir: '<%= dirs.coverageE2E %>/reports',
		print: 'detail'
	  }
	},
	
	preprocess: {
	    options: {
            context: {
            }
        },
	    dev: {
	    	options: {
				context: {
					STANDALONE: true
				}
			},
			files:[
				{src:'<%=dirs.templates %>/taskplanner/task-planner.js', dest:'app/taskplanner/task-planner.js'},
				{src:'<%=dirs.templates %>/taskplanner/task-planner.html', dest:'app/taskplanner/task-planner.html'}				
			]
	    },
	
	    portal: {
	    	options: {
				context: {
					PORTAL:true
				}
			},
			files:[
				{src:'<%=dirs.templates %>/taskplanner/task-planner.js', dest:'<%=dirs.portal %>/taskplanner/task-planner.js'},
				{src:'<%=dirs.templates %>/taskplanner/task-planner.html', dest:'<%=dirs.portal %>/taskplanner/task-planner.html'}				
			]
	    }	
	}
  });	  
  
  // Each plugin must be loaded following this pattern
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-protractor-runner');
  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.loadNpmTasks('grunt-contrib-clean');  
  grunt.loadNpmTasks('grunt-contrib-copy');  
  grunt.loadNpmTasks('grunt-istanbul');
  grunt.loadNpmTasks('grunt-protractor-coverage');
  grunt.loadNpmTasks('grunt-apimocker');
  grunt.loadNpmTasks('grunt-connect-proxy');
  grunt.loadNpmTasks('grunt-preprocess');
  
  
  grunt.registerTask('checkStyle', ['jshint:devFiles', 'csslint:local']);
  grunt.registerTask('e2e-test', ['apimocker', 'configureProxies:test', 'connect:test', 'protractor:e2e']);
  grunt.registerTask('smoke-sit-test', ['protractor:smoke']);
  grunt.registerTask('unit-test', ['karma:continuous:start', 'watch:karma']);
  grunt.registerTask('all-test', ['karma:unit', 'e2e-test']);

  grunt.registerTask('test', ['karma:unit']);
  
  grunt.registerTask('e2e-coverage', [
		'copy:coverageE2E',
		'instrument',
		'apimocker',
		'configureProxies:coverageE2E',
		'connect:coverageE2E',
		'protractor_coverage:phantomjs',
		'makeReport'
		]);
   grunt.registerTask('tests-with-coverage', ['clean:all','preprocess:dev', 'checkStyle', 'karma:unit', 'e2e-coverage']);
   
   grunt.registerTask('mocker-dev',['configureProxies:livereload','apimocker', 'connect:livereload']);
};
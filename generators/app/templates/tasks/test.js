'use strict';

module.exports = function(grunt) {

    grunt.registerTask('test:e2e', [
        'clean:reports',
        'clean:server',
        'concurrent:server',
        'postcss:css',
        'instrument',
        'browserSync:test',
        'shell:jasmine2'
    ]);

    grunt.registerTask('test:unit', [
        'clean:reports',
        'karma:continuous'
    ]);

    grunt.registerTask('test:dev:unit', [
        'clean:reports',
        'karma:unit'
    ]);


};

(function() {
    'use strict';

    angular.module('App.Controllers', []);

    angular.module('basetfgApp', [
        'ngAnimate',
        'ui.bootstrap',
        'angularRipple',
        'ui.select',
        'ui.router',
        'App.Controllers',
        'ngMdIcons',
        'angular-loading-bar'
    ]).run(function($log) {
        $log.debug('run');
    }).config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
        cfpLoadingBarProvider.includeSpinner = false;
    }]);


    //Animation for views transition.
    angular.module('basetfgApp').animation('.fade-in', function() {
        return {
            enter: function(element, done) {
                element.css({
                    opacity: 0
                }).animate({
                    opacity: 1
                }, 1000, done);
            },
            leave: function(element, done) {
                element.css({
                    opacity: 0
                });
                done();
            }
        };
    });

})();
'use strict';

/**
 * @ngdoc overview
 * @name angularYoApp
 * @description
 * # angularYoApp
 *
 * Main module of the application.
 */
angular
  .module('angularYoApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'scripts/components/contextLoader/contextLoader.html',
        controller: 'ContextLoader',
        controllerAs: 'context'
      })
      .when('/about', {
        redirectTo: '/'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

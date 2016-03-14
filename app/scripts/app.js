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
    'ui.bootstrap',
    'restangular'
  ])
  .config(function ($routeProvider,RestangularProvider) {
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
    
     RestangularProvider.addResponseInterceptor(function(data, operation, what, url, response, deferred) {
      var extractedData;
      if (operation === "getList") {
        extractedData = data.result;
      } else {
        extractedData = data;
      }
      return extractedData;
    });
  });

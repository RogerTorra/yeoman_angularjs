'use strict';

/**
 * @ngdoc function
 * @name angularYoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularYoApp
 */
 
angular.module('angularYoApp')
.directive('basebeer', function() {
  return {
    restrict: 'E',
    templateUrl: '/scripts/components/baseBeer/baseBeer.html'
  };
});

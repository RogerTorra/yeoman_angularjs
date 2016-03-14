'use strict';

/**
 * @ngdoc function
 * @name angularYoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularYoApp
 */
 
angular.module('angularYoApp')
.factory('BaseBeerFactory', function(Restangular) {
    
  return {
    getData: function(param){
        return Restangular.all(param).getList({key:'a53d6261421a1f2df295743de64f4455'});
    }
  };
    
});
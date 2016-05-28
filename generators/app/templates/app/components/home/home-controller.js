'use strict';

angular.module('basetfgApp')

.controller('homeController',
    function ($log, $scope) {
        $log.debug('homeController loading');
        $scope.greeting = 'Welcome';
    });

'use strict';

angular.module('<%= name %>App')

.controller('homeController',
    function ($log, $scope) {
        $log.debug('homeController loading');
        $scope.greeting = 'Welcome';
    });

'use strict';

angular.module('<%= name %>App')

.controller('gruntController',
    function ($log, $scope) {
        $log.debug('gruntController loading');
        $scope.greeting = 'Welcome';
    });

'use strict';

angular.module('test_yoApp')

.controller('gruntController',
    function ($log, $scope) {
        $log.debug('gruntController loading');
        $scope.greeting = 'Welcome';
    });

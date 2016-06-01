'use strict';

angular.module('test_yoApp')

.controller('beersController',/* @ngInject */
    function ($log, $scope,styles,Restangular) {
    
        $log.debug('beersController loading');
    
        var vm = this;
    
        vm.beers = {};
        vm.styles = _.take(styles.data, 12);
        vm.selectedStyle = vm.styles[0];
    
        reloadBeers();
        
        function reloadBeers(){
            var selectedId = vm.selectedStyle.id;
            Restangular.all("api").customGET("beers",{'id':selectedId}).then(function(response){
                vm.beers = response.data;
                console.log(response.data);
            });
        }
    });

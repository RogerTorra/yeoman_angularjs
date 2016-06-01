'use strict';

angular.module('<%= name %>App')

.controller('beersController',/* @ngInject */
    function ($log, $scope,styles,Restangular) {
    
        $log.debug('beersController loading');
    
        var vm = this;
    
        var beers = [];
        var index = 0;
        vm.styles = _.take(styles.data, 12);
        vm.selectedStyle = vm.styles[0];
        vm.currentBeer = {};
        vm.next = next;
        vm.back = back;
        vm.reload = reloadBeers;
    
        reloadBeers();
        
        function reloadBeers(){
            var selectedId = vm.selectedStyle.id;
            Restangular.all("api").customGET("beers",{'id':selectedId}).then(function(response){
                beers = response.data;
                index = 0;
                vm.currentBeer = beers[index];
                console.log(response.data);
            });
        }
    
        function next(){       
            index = index + 1;
            vm.currentBeer = _.nth(beers, index);
        }
        function back(){
            index = index - 1;
            vm.currentBeer = _.nth(beers, index);
        }
    });

(function() {
    'use strict';

    angular.module('wish-list.items')
        .controller('ItemsController', ItemsController);

    ItemsController.$inject = ['items']
    function ItemsController(items) {
        let $ctrl = this;
        
        $ctrl.test = 'test';
        $ctrl.items = items;
    }
})();
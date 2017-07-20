(function() {
    'use strict';

    angular.module('wish-list.items')
        .controller('ItemController', ItemController);

    ItemController.$inject = ['items']
    function ItemController(items) {
        let $ctrl = this;

        $ctrl.items = items;
    }
})();
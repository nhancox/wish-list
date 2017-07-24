(function() {
    'use strict';

    angular.module('wish-list.items', [
        'ui.router'
    ])
        .config(RouteConfig);

    RouteConfig.$inject = ['$stateProvider'];
    function RouteConfig($stateProvider) {
        $stateProvider
            .state('wish-list', {
                url: '/',
                templateUrl: 'client/modules/items/views/items.html',
                controller: 'ItemsController as $ctrl',
                resolve: {
                    items: getAllItems
                }
            });
    }

    getAllItems.$inject = ['itemsService'];
    function getAllItems(itemsService) {
        return itemsService.getAll()
            .then((items) => {
                return items;
            })
            .catch((error) => {
                console.log(`Error: ${error}`);
            });
    }
})();
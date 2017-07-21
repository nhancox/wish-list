(function() {
    'use strict';

    angular.module('wish-list.items', [])
        .config(RouteConfig);

    RouteConfig.$inject = ['$locationProvider', '$routeProvider'];
    function RouteConfig($locationProvider, $routeProvider) {
        $routeProvider
            .when('/list', {
                templateUrl: '/client/modules/items/views/items.html',
                controller: 'ItemsController',
                controllerAs: '$ctrl',
                resolve: {
                    items: getAllItems
                }
            });
    }

    getAllItems.$inject = ['itemsService'];
    function getAllItems(itemsService) {
        itemsService.getAll()
            .then((items) => {
                return items;
            })
            .catch((error) => {
                console.log(`Error: ${error}`);
            });
    }
})();
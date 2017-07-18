(function() {
    'use strict';

    angular.module('wish-list.items', [])
        .config(RouteConfig);

    RouteConfig.$inject = ['$locationProvider', '$routeProvider'];
    function RouteConfig($locationProvider, $routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: '',
                controller: 'ItemController',
                resolve: {
                    
                }
            })
    }
})();
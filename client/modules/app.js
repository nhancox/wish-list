(function() {
    'use strict'

    angular.module('wish-list', [
        'ngRoute',

        /* 'wish-list.index', */
        'wish-list.items',
        'wish-list.services'
    ])
        .config(RouteConfig);

    RouteConfig.$inject = ['$locationProvider', '$routeProvider'];
    function RouteConfig($locationProvider, $routeProvider) {
        $locationProvider.html5mode(true);
        $routeProvider.otherwise({
            redirectTo: '/'
        });
    }
})();
(function() {
    'use strict'

    angular.module('wish-list', [
        'ngRoute',

        'wish-list.items'
    ])
        .config(RouteConfig)

    RouteConfig.$inject = ['$locationProvider', '$urlRouterProvider'];
    function RouteConfig($locationProvider, $urlRouterProvider) {
        $locationProvider.html5mode(true);
        $urlRouterProvider.otherwise('/');
    }
})();
(function() {
    'use strict'

    angular.module('wish-list', [
        'ngRoute',

        'wish-list.items',
        'wish-list.services'
    ])
        .config(RouteConfig);

    RouteConfig.$inject = ['$locationProvider', '$routeProvider'];
    function RouteConfig($locationProvider, $routeProvider) {
        
         $routeProvider
            .when('/home', {
                templateUrl: 'client/modules/index/views/index.html',
            }) 
             .otherwise({
                redirectTo: '/'
            }); 
        $locationProvider.html5Mode(true);
    }
})();
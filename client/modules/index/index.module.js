(function() {
    'use strict';

    angular.module('wish-list.index', [
        'ui.router'
    ])
        .config(RouteConfig);

    RouteConfig.$inject = ['$stateProvider'];
    function RouteConfig($stateProvider) {
        $stateProvider
            .state('wish-list', {
                abstract: true,
                templateUrl: 'client/modules/index/views/index.html'
            })
    }
})();
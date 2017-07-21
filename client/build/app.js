(function() {
    'use strict';
    
    angular.bootstrap(document, ['wish-list']);
});
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
(function() {
    'use strict';

    angular.module('wish-list.services', [])
})();
(function () {
    'use strict';

    angular.module('wish-list.services')
        .factory('itemsService', itemsService);

    itemsService.$inject = ['$http'];
    function itemsService($http) {
        'use strict';

        return {
            getAll: getAll,
            get: get,
            insert: insert,
            update: update,
            remove: remove
        };

        function getAll() {
            return $http.get('/api/items')
                .then(onSuccess)
                .catch(onError);
        }

        function get(id) {
            return $http.get(`/api/items/${id}`)
                .then(onSuccess)
                .catch(onError);
        }

        function insert(document) {
            return $http.post('/api/items', document)
                .then(onSuccess)
                .catch(onError);
        }

        function update(id, document) {
            return $http.put(`/api/items/${id}`, document)
                .then(onSuccess)
                .catch(onError);
        }

        function remove(id) {
            return $http.delete(`/api/items/${id}`)
                .then(onSuccess)
                .catch(onError);
        }

        function onSuccess(response) {
            return response.data
        }

        function onError(response) {
            console.log(`Error: ${response.data}`);
        }
    }
})();
(function() {
    'use strict';

    angular.module('wish-list.items')
        .controller('ItemsController', ItemsController);

    ItemsController.$inject = ['items']
    function ItemsController(items) {
        let $ctrl = this;
        debugger
        $ctrl.items = items;
    }
})();
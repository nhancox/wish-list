(function() {
    'use strict';
    
    angular.bootstrap(document, ['wish-list']);
});
(function() {
    'use strict'

    angular.module('wish-list', [
        'wish-list.items',
        'wish-list.services'
    ])
        .config(RouteConfig);

    RouteConfig.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider'];
    function RouteConfig($locationProvider, $stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
        $locationProvider.html5Mode(true);
    }
})();
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

    ItemsController.$inject = ['$scope', '$timeout', 'items', 'itemsService']
    function ItemsController($scope, $timeout, items, itemsService) {
        let $ctrl = this;
        
        $ctrl.addItem = false;
        $ctrl.editItem = false;
        $ctrl.error = false;
        $ctrl.insertItem = insertItem;
        $ctrl.items = items;
        $ctrl.putItem = putItem;
        $ctrl.removeItem = removeItem;
        $ctrl.statusMessage = '';
        $ctrl.success = false;

        function insertItem(isValid) {
            if (!isValid) {
                $ctrl.statusMessage = 'Invalid form data. Please try again.';
                $ctrl.error = true;
            } else {
                itemsService.insert($ctrl.insertForm)
                    .then((response) => {
                        $ctrl.items.push(response);
                        onSuccess();
                    })
                    .catch(onError);
            }
        }

        function putItem(isValid) {
            if (!isValid) {
                $ctrl.statusMessage = 'Invalid form data. Please try again.';
                $ctrl.error = true;
            } else {
                let document = {
                    name: $ctrl.putForm.name,
                    notes: $ctrl.putForm.notes
                };

                itemsService.update($ctrl.putForm._id, document)
                    .then(onSuccess)
                    .catch(onError);
            }
        }

        function removeItem(id) {
            itemsService.remove(id)
                .then(() => {
                    let removeIndex = $ctrl.items.findIndex((element) => {
                        return element._id === id;
                    })
                    $ctrl.items.splice(removeIndex, 1);
                    
                    onSuccess();
                })
                .catch(onError);
        }

        function onSuccess() {
            $ctrl.error = false;
            $ctrl.success = true;
            $ctrl.addItem = false;
            $ctrl.insertForm = {};
            $scope.addItemForm.$setPristine();
            $ctrl.editItem = false;
            $ctrl.putForm = {};
            $scope.editItemForm.$setPristine();
            $timeout(() => {
                $ctrl.success = false;
            }, 3000);
        }

        function onError(response) {
            $ctrl.statusMessage = response;
            $ctrl.error = true;
        }
    }
})();
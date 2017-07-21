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
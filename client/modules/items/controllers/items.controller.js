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
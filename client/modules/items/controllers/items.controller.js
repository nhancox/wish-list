(function() {
	"use strict";

	angular
		.module("wish-list.items")
		.controller("ItemsController", ItemsController);

	ItemsController.$inject = ["$scope", "$timeout", "items", "itemsService"];
	function ItemsController($scope, $timeout, items, itemsService) {
		let $ctrl = this;

		$ctrl.addItem = false;
		$ctrl.editItem = false;
		$ctrl.error = false;
		$ctrl.insertForm = {};
		$ctrl.insertItem = insertItem;
		$ctrl.items = items;
		$ctrl.putForm = {};
		$ctrl.putItem = putItem;
		$ctrl.removeItem = removeItem;
		$ctrl.resetForms = resetForms;
		$ctrl.saving = false;
		$ctrl.statusMessage = "";
		$ctrl.success = false;
		$ctrl.togglePutForm = togglePutForm;

		function insertItem(isValid) {
			if (!isValid) {
				$ctrl.statusMessage = "Invalid form data. Please try again.";
				$ctrl.error = true;
				return;
			}

			$ctrl.saving = true;
			return itemsService
				.insert($ctrl.insertForm)
				.then((response) => {
					$ctrl.items.push(response);
					return onSuccess();
				})
				.catch(onError);
		}

		function putItem(isValid) {
			if (!isValid) {
				$ctrl.statusMessage = "Invalid form data. Please try again.";
				$ctrl.error = true;
				return;
			}

			$ctrl.saving = true;
			let document = {
				name: $ctrl.putForm.name,
				notes: $ctrl.putForm.notes
			};

			return itemsService
				.update($ctrl.putForm._id, document)
				.then(onSuccess)
				.catch(onError);
		}

		function removeItem(id) {
			$ctrl.saving = true;
			return itemsService
				.remove(id)
				.then(() => {
					const removeIndex = $ctrl.items.findIndex((item) => {
						return item._id === id;
					});
					$ctrl.items.splice(removeIndex, 1);

					return onSuccess();
				})
				.catch(onError);
		}

		function resetForms() {
			$ctrl.insertForm = {};
			$scope.addItemForm.$setPristine();
			$ctrl.putForm = {};
			$scope.editItemForm.$setPristine();
			return;
		}

		function togglePutForm(item) {
			$ctrl.editItem =
				$ctrl.putForm._id !== item._id ? true : !$ctrl.editItem;
			$ctrl.addItem = false;
			$ctrl.resetForms();
			$ctrl.putForm = JSON.parse(JSON.stringify(item));
			return;
		}

		function onSuccess() {
			if ($ctrl.editItem) {
				const swapIndex = $ctrl.items.findIndex((item) => {
					return item._id === $ctrl.putForm._id;
				});
				$ctrl.items[swapIndex] = JSON.parse(
					JSON.stringify($ctrl.putForm)
				);
			}

			$ctrl.error = false;
			$ctrl.success = true;
			$ctrl.saving = false;
			$ctrl.addItem = false;
			$ctrl.editItem = false;
			resetForms();
			return $timeout(() => {
				$ctrl.success = false;
			}, 3000);
		}

		function onError(response) {
			$ctrl.statusMessage = response;
			$ctrl.error = true;
			$ctrl.saving = false;
			return;
		}
	}
})();

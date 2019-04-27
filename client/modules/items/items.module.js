(function() {
	"use strict";

	angular.module("wish-list.items", ["ui.router"]).config(RouteConfig);

	RouteConfig.$inject = ["$stateProvider"];
	function RouteConfig($stateProvider) {
		$stateProvider.state("wish-list", {
			url: "/",
			templateUrl: "client/modules/items/views/items.html",
			controller: "ItemsController as $ctrl",
			resolve: {
				items: getAllItems
			}
		});
	}

	getAllItems.$inject = ["itemsService"];
	function getAllItems(itemsService) {
		return itemsService
			.getAll()
			.then((items) => {
				return items;
			})
			.catch((error) => {
				// To watch for this you'd have to have a listener on
				// `$stateChangeError`.
				// Because this is a quick update I'm leaving the log and
				// allowing the silent failure.
				// eslint-disable-next-line
				console.log(`Error in getAllItems resolve: ${error}`);
				return;
			});
	}
})();

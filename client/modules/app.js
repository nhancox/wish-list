(function() {
	"use strict";

	angular
		.module("wish-list", ["wish-list.items", "wish-list.services"])
		.config(RouteConfig);

	RouteConfig.$inject = [
		"$locationProvider",
		"$stateProvider",
		"$urlRouterProvider"
	];
	function RouteConfig(
		$locationProvider,
		$stateProvider,
		$urlRouterProvider
	) {
		$urlRouterProvider.otherwise("/");
		$locationProvider.html5Mode(true);
	}
})();

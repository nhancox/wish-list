"use strict";

const path = require("path");

module.exports = sitesController;

function sitesController() {
	return {
		index: index
	};

	function index(req, res) {
		res.sendFile("client/modules/index/views/index.html", {
			root: path.join(__dirname, "../..")
		});
	}
}

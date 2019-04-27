"use strict";

const itemsService = require("../services/items.service")();

module.exports = itemsController;

function itemsController() {
	return {
		getAll: getAll,
		get: get,
		insert: insert,
		update: update,
		remove: remove
	};

	function getAll(req, res) {
		itemsService
			.getAll()
			.then((items) => {
				return res.status(200).json(items);
			})
			.catch((err) => {
				return res.status(500).send(err);
			});
	}

	function get(req, res) {
		itemsService
			.get(req.params.id)
			.then((item) => {
				return res.status(200).json(item);
			})
			.catch((err) => {
				return res.status(500).send(err);
			});
	}

	function insert(req, res) {
		itemsService
			.insert(req.body)
			.then((response) => {
				return res.status(201).json(response);
			})
			.catch((err) => {
				return res.status(500).send(err);
			});
	}

	function update(req, res) {
		let query = {
			_id: req.params.id
		};

		itemsService
			.update(query, req.body)
			.then((response) => {
				return res.status(200).json(response);
			})
			.catch((err) => {
				return res.status(500).send(err);
			});
	}

	function remove(req, res) {
		let query = {
			_id: req.params.id
		};

		itemsService
			.remove(query)
			.then((response) => {
				return res.status(204).json(response);
			})
			.catch((err) => {
				return res.status(500).send(err);
			});
	}
}

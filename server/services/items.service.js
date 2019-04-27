"use strict";

const Item = require("../models/item");

module.exports = itemsService;

function itemsService() {
	return {
		getAll: getAll,
		get: get,
		insert: insert,
		update: update,
		remove: remove
	};

	function getAll() {
		return Item.find();
	}

	function get(query) {
		return Item.findOne(query);
	}

	function insert(document) {
		const item = new Item(document);
		return item.save();
	}

	function update(query, document) {
		return Item.findOneAndUpdate(query, document, {
			new: true
		});
	}

	function remove(query) {
		return Item.findOneAndRemove(query);
	}
}

'use strict';

const itemsService = require('../services/items.service')();

module.exports = itemController;

function itemController() {
    return {
        getAll: getAll,
        get: get,
        insert: insert,
        update: update,
        remove: remove
    };

    function getAll(req, res) {
        itemsService.getAll()
            .then((items) => {
               return res.json(items); 
            })
            .catch((err) => {
                return res.status(500).send(err);
            });
    }

    function get(req, res) {
        itemsService.get(req.params.id)
            .then((item) => {
                return res.json(item);
            })
            .catch((err) => {
                return res.status(500).send(err);
            });
    }

    function insert(req, res) {
        itemsService.insert(req.body)
            .then((response) => {
                return res.status(201).json(response);
            })
            .catch((err) => {
                return res.status(500).send(err);
            });
    }

    function update(req, res) {
        itemsService.update(req.params.id, req.body)
            .then((response) => {
                return res.json(response);
            })
            .catch((err) => {
                return res.status(500).send(err);
            });
    }

    function remove(req, res) {
        itemsService.remove(req.params.id)
            .then((response) => {
                return res.json(response);
            })
            .catch((err) => {
                return res.status(500).send(err);
            });
    }
}
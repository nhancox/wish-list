'use strict';

const itemService = require('../services/item.service');

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
        itemService.getAll()
            .then((items) => {
               return res.json(items); 
            })
            .catch((err) => {
                return res.status(500).send(err);
            });
    }

    function get(req, res) {
        itemService.get(req.params.id)
            .then((item) => {
                return res.json(item);
            })
            .catch((err) => {
                return res.status(500).send(err);
            });
    }

    function insert(req, res) {
        itemService.insert(req.body)
            .then((response) => {
                return res.status(201).json(response);
            })
            .catch((err) => {
                return res.status(500).send(err);
            });
    }

    function update(req, res) {
        itemService.update(req.params.id, req.body)
            .then((response) => {
                return res.json(response);
            })
            .catch((err) => {
                return res.status(500).send(err);
            });
    }

    function remove(req, res) {
        itemService.remove(req.params.id)
            .then((response) => {
                return res.json(response);
            })
            .catch((err) => {
                return res.status(500).send(err);
            });
    }
}
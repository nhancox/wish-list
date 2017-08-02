'use strict';

const itemsService = require('../services/items.service')();

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
        itemsService.getAll()
            .then((items) => {
                res.json(items); 
            })
            .catch((err) => {
                res.status(500).send(err);
            });
    }

    function get(req, res) {
        itemsService.get(req.params.id)
            .then((item) => {
                res.json(item);
            })
            .catch((err) => {
                res.status(500).send(err);
            });
    }

    function insert(req, res) {
        itemsService.insert(req.body)
            .then((response) => {
                res.status(201).json(response);
            })
            .catch((err) => {
                res.status(500).send(err);
            });
    }

    function update(req, res) {
        let query = {
            _id: req.params.id
        };
        
        itemsService.update(query, req.body)
            .then((response) => {
                res.json(response);
            })
            .catch((err) => {
                res.status(500).send(err);
            });
    }

    function remove(req, res) {
        let query = {
            _id: req.params.id
        };
        
        itemsService.remove(query)
            .then((response) => {
                res.json(response);
            })
            .catch((err) => {
                res.status(500).send(err);
            });
    }
}
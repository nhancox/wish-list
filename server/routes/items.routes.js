'use strict';

const router = require('express').Router();

const itemsController = require('../controllers/items.controller')();

module.exports = router;

router.get('/', itemsController.getAll);
router.get('/:id', itemsController.get);

router.post('/', itemsController.insert);

router.put('/:id', itemsController.update);

router.delete('/:id', itemsController.remove);
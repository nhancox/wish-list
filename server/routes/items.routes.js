'use strict';

const router = require('express').Router();

const itemController = require('../controllers/item.controller')();

module.exports = router;

router.get('/', itemController.getAll);
router.get('/:id', itemController.get);

router.post('/', itemController.insert);

router.put('/:id', itemController.update);

router.delete('/:id', itemController.remove);
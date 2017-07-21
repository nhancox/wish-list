'use strict';

const router = require('express').Router();

const sitesController = require('../controllers/sites.controller');

module.exports = router;

router.get('/client/*', sitesController.html);
router.get('/*', sitesController.default);
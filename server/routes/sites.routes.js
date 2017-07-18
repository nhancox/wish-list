'use strict';

const router = require('express').Router();

const sitesController = require('../controllers/sites.controller');

router.get('/*', sitesController.default);

module.exports = router;
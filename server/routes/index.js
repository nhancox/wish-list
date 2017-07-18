'use strict';

const router = require('express').Router();

const itemRoutes = require('./agency.routes');

const sitesRoutes = require('./sites.routes');

router.use('/api/items', itemRoutes);

router.use('/api/*', (req, res, next) => {
    res.sendStatus(404);
})

router.use(sitesRoutes);

router.use((err, req, res, next) => {
    if (!err) {return next();}

    console.error(err.stack);

    res.sendStatus(500);
});

module.exports = router;
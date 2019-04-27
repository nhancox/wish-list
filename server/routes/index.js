"use strict";

const router = require("express").Router();

const itemRoutes = require("./items.routes");

const sitesRoutes = require("./sites.routes");

module.exports = router;

router.use("/api/items", itemRoutes);

router.use("/api/*", (req, res) => {
	res.sendStatus(404);
});

router.use(sitesRoutes);

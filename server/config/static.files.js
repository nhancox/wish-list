"use strict";

const path = require("path");

const express = require("express");

const app = express();

module.exports = app;

app.use(
	"/client",
	express.static(path.join(__dirname, "../../client"), {
		fallthrough: false
	})
);

app.use("/css", express.static("client/build/css"));
app.use("/fonts", express.static("client/build/fonts"));
app.use("/js", express.static("client/build/js"));

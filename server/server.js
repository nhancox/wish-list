"use strict";

require("dotenv").config();

const http = require("http");

const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");

const MONGO_CONNECTION = process.env.MONGODB_URL;
const PORT = process.env.PORT;

const app = express();

mongoose
	.connect(MONGO_CONNECTION, {
		useFindAndModify: false,
		useNewUrlParser: true
	})
	.catch((err) => {
		// eslint-disable-next-line
		console.error(`Unable to connect to Mongo database: ${err}`);
		process.exit(1);
	});

app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true
	})
);

app.use(require("./config/static.files"));
app.use(require("./routes"));
app.use((req, res) => {
	res.sendStatus(404);
});

http.createServer(app).listen(PORT);

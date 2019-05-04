const fs = require("fs");
const { join } = require("path");
const { promisify } = require("util");

const del = require("del");

const { dest, parallel, series, src, watch } = require("gulp");
const babel = require("gulp-babel");
const cleanCSS = require("gulp-clean-css");
const concat = require("gulp-concat");
const nodemon = require("gulp-nodemon");
const uglify = require("gulp-uglify");

const SOURCE = {
	css: {
		app: ["client/modules/app.css"],
		vendor: ["node_modules/bootstrap/dist/css/bootstrap.min.css"]
	},
	js: {
		app: [
			"client/modules/main.js",
			"client/modules/app.js",
			"client/modules/**/*.module.js",
			"client/modules/**/*.!(module)*.js"
		],
		vendor: [
			"node_modules/jquery/dist/jquery.min.js",
			"node_modules/angular/angular.min.js",
			"node_modules/angular-ui-router/release/angular-ui-router.min.js",
			"node_modules/bootstrap/dist/js/bootstrap.min.js"
		]
	}
};
const DESTINATION_PREFIX = "client/build";
const DESTINATION_SUFFIXES = {
	css: `css`,
	js: `js`
};

const buildCSS = parallel(buildAppCSS, buildVendorCSS);
const buildJS = parallel(buildAppJS, buildVendorJS);
const buildAll = parallel(buildCSS, buildJS);
const watchAll = parallel(watchAppCSS, watchAppJS);

const buildTask = series(clean, buildAll);

module.exports.build = buildTask;
module.exports.clean = clean;
module.exports.dev = series(buildTask, parallel(nodemonServer, watchAll));

function buildAppCSS() {
	const destination = join(DESTINATION_PREFIX, DESTINATION_SUFFIXES.css);
	return src(SOURCE.css.app)
		.pipe(concat("app.css"))
		.pipe(cleanCSS())
		.pipe(dest(destination));
}

function buildVendorCSS() {
	const destination = join(DESTINATION_PREFIX, DESTINATION_SUFFIXES.css);
	return src(SOURCE.css.vendor)
		.pipe(concat("vendor.css"))
		.pipe(cleanCSS())
		.pipe(dest(destination));
}

function buildAppJS() {
	const destination = join(DESTINATION_PREFIX, DESTINATION_SUFFIXES.js);
	return src(SOURCE.js.app, { sourcemaps: false })
		.pipe(babel())
		.pipe(concat("app.js"))
		.pipe(dest(destination))
		.pipe(uglify())
		.pipe(dest(destination));
}

function buildVendorJS() {
	const destination = join(DESTINATION_PREFIX, DESTINATION_SUFFIXES.js);
	return src(SOURCE.js.vendor, { sourcemaps: false })
		.pipe(babel())
		.pipe(concat("vendor.js"))
		.pipe(dest(destination))
		.pipe(uglify())
		.pipe(dest(destination));
}

async function clean() {
	await del(DESTINATION_PREFIX);
	await promisify(fs.mkdir)(DESTINATION_PREFIX);
	const subdirectories = Object.values(DESTINATION_SUFFIXES).map(
		async (suffix) => {
			await promisify(fs.mkdir)(join(DESTINATION_PREFIX, suffix));
			return;
		}
	);
	await Promise.all(subdirectories);
	return;
}

function nodemonServer(callback) {
	let started = false;
	return nodemon({ script: "server/server.js" }).on("start", () => {
		if (!started) {
			started = true;
			callback();
		}
	});
}

function watchAppCSS() {
	return watch(SOURCE.css.app, { event: "any" }, buildAppCSS);
}

function watchAppJS() {
	return watch(SOURCE.js.app, { event: "any" }, buildAppJS);
}

const fs = require("fs");
const util = require("util");

const { dest, parallel, series, src, watch } = require("gulp");
const babel = require("gulp-babel");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");

const SOURCE = {
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
const DESTINATION = "client/build";

module.exports.build = series(clean, parallel(buildAppJS, buildVendorJS));
module.exports.clean = clean;
module.exports.watch = watchAppJS;

function buildAppJS() {
	return src(SOURCE.js.app, { sourcemaps: false })
		.pipe(babel())
		.pipe(concat("app.js"))
		.pipe(dest(DESTINATION))
		.pipe(uglify())
		.pipe(dest(DESTINATION));
}

function buildVendorJS() {
	return src(SOURCE.js.vendor, { sourcemaps: false })
		.pipe(babel())
		.pipe(concat("vendor.js"))
		.pipe(dest(DESTINATION))
		.pipe(uglify())
		.pipe(dest(DESTINATION));
}

async function clean() {
	const files = await util.promisify(fs.readdir)(DESTINATION);

	if (!files.length) {
		return;
	}

	for (let file of files) {
		await util.promisify(fs.unlink)(`${DESTINATION}/${file}`);
	}

	return;
}

function watchAppJS() {
	return watch(SOURCE.js.app, { event: "any" }, buildAppJS);
}

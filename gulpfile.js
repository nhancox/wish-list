const gulp = require("gulp");
const concat = require("gulp-concat");

const source = {
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
const destination = "client/build";

gulp.task("app.js", () => {
	return gulp
		.src(source.js.app)
		.pipe(concat("app.js"))
		.pipe(gulp.dest(destination));
});

gulp.task("vendor.js", () => {
	return gulp
		.src(source.js.vendor)
		.pipe(concat("vendor.js"))
		.pipe(gulp.dest(destination));
});

gulp.task("default", ["app.js", "vendor.js"]);

const appWatcher = gulp.watch(source.js.app, ["app.js"]);
appWatcher.on("change", (event) => {
	// Print to console to help monitor watch process
	// eslint-disable-next-line
	console.log(`File ${event.path} was ${event.type}, running tasks…`);
});

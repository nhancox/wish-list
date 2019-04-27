module.exports = {
	root: true,
	env: {
		browser: true,
		es6: true,
		node: true
	},
	extends: ["eslint:recommended", "plugin:prettier/recommended"],
	globals: {
		angular: "readonly"
	},
	parserOptions: {
		ecmaVersion: 8,
		parser: "babel-eslint"
	},
	plugins: ["prettier"]
};

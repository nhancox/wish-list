const express = require('express');
const app = express();

module.exports = app;

app.use('/bootstrap-css', express.static('node_modules/bootstrap/dist/css/bootstrap.min.css', {
    fallthrough: false
}));

app.use('/app-js', express.static('client/build/app.js', {
    fallthrough: false
}));
app.use('/vendor-js', express.static('client/build/vendor.js', {
    fallthrough: false
}));
const express = require('express');
const app = express();

module.exports = app;

app.use('/bootstrap-css', express.static('node_modules/bootstrap/dist/css/bootstrap.min.css', {
    fallthrough: false
}));

app.use('/app', express.static('client/modules/app.js', {
    fallthrough: false
}));
app.use('/main', express.static('client/modules/main.js', {
    fallthrough: false
}));

app.use('/angular', express.static('node_modules/angular/angular.min.js', {
    fallthrough: false
}));
app.use('/angular-route', express.static('node_modules/angular-route/angular-route.min.js', {
    fallthrough: false
}));
app.use('/bootstrap', express.static('node_modules/bootstrap/dist/js/bootstrap.min.js', {
    fallthrough: false
}));
app.use('/jquery', express.static('node_modules/jquery/dist/jquery.min.js', {
    fallthrough: false
}));
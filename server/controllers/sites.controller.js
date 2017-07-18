'use strict';

const path = require('path');

module.exports = {
    default: (req, res, next) => {
        res.sendFile('client/index.html')
    }
}
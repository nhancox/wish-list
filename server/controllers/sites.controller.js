'use strict';

const path = require('path');

module.exports = {
    default: (req, res, next) => {
        res.sendFile('index.html', {
            root: 'client/modules/index/views'
        });
    }
}
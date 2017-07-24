'use strict';

const path = require('path');

module.exports = {
    index: (req, res, next) => {
        res.sendFile('client/modules/index/views/index.html', {
            root: path.join(__dirname, '../..')
        });
    }
}
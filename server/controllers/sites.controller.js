'use strict';

const path = require('path');

module.exports = {
    index: (req, res, next) => {
        res.sendFile('index.html', {
            root: 'client/modules/index/views'
        });
    },
    html: (req, res, next) => {
        let filename = req.url;
        filename = filename.split('/');
        filename = filename[filename.length - 1];
        filename = filename.split('.');
        filename = filename[0]

        res.sendFile(`${filename}.html`, {
            root: `client/modules/${filename}/views`
        });
    }
}
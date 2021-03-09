const proxy = require('http-proxy-middleware');

    module.exports = function(app) {
        app.use(proxy('/inventory/**', { target: 'https://grocery-tracker1.herokuapp.com/' }));
        app.use(proxy('/shoplistitems/**', { target: 'https://grocery-tracker1.herokuapp.com/' }));
    };
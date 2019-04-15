const users = require('./users');
const menu = require('./menu');
const products = require('./products');

module.exports = (router) => {
    users(router);
    menu(router);
    products(router);
    
    return router;
}
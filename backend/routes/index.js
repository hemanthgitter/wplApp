const users = require('./users');
const menu = require('./menu');
const products = require('./products');
const orders = require('./orders');

module.exports = (router) => {
    users(router);
    menu(router);
    products(router);
    orders(router);
    
    return router;
}
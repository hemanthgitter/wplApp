const users = require('./users');
const menu = require('./menu');
const products = require('./products');
const orders = require('./orders');
const roles = require('./roles');

module.exports = (router) => {
    users(router);
    menu(router);
    products(router);
    orders(router);
    roles(router);
    
    return router;
}
const controller = require('../controllers/orders');
const validateToken = require('../utils').validateToken;

module.exports = (router) => {
    router.route('/purchase')
        .post(validateToken, controller.purchaseProducts);

    router.route('/order-list/:id')
        .get(validateToken, controller.purchasedList);
}
const controller = require('../controllers/products');
const validateToken = require('../utils').validateToken;

module.exports = (router) => {
    router.route('/saveProduct')
        .post(validateToken, controller.saveProduct);
    router.route('/allProducts')
        .get(validateToken, controller.getAllProducts);
    router.route('/categories')
        .get(validateToken, controller.getAllCategories);
}
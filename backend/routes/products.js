const controller = require('../controllers/products');
const validateToken = require('../utils').validateToken;

module.exports = (router) => {
    router.route('/saveProduct')
        .post(validateToken, controller.saveProduct);
    router.route('/updateProduct')
        .post(validateToken, controller.updateProduct);
    router.route('/allProducts')
        .post(validateToken, controller.getAllProducts);
    router.route('/product/:id')
        .get(validateToken, controller.getProduct);
    router.route('/product/:id')
        .delete(validateToken, controller.deleteProduct);
    router.route('/categories')
        .get(validateToken, controller.getAllCategories);
}
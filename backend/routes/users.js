const controller = require('../controllers/users');
const validateToken = require('../utils').validateToken;

module.exports = (router) => {
    router.route('/register')
        .post(controller.add);

    router.route('/login')
        .post(controller.login);

    router.route('/users')
        .get(validateToken, controller.getAll);
}
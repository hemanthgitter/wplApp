const controller = require('../controllers/menu');
const validateToken = require('../utils').validateToken;

module.exports = (router) => {
    router.route('/menu')
        .post(validateToken, controller.get);
}
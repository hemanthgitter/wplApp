const controller = require('../controllers/roles');
module.exports = (router) => {
    router.route('/roles')
        .get(controller.getRoles);
}
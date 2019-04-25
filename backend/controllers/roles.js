const Role = require("../models").Role;
const message = require('../errorText').messages;

module.exports = {

    getRoles: (req, res, next) => {
        let result = {};
        let status = 200;
        Role.findAll({
            attributes: ['id', 'name']
        }).then(roles => {
            result.status = status;
            result.result = roles;
            res.status(status).send(result);
        }).catch(err => {
            err.message = message.unknown_error;
            next(err);
        });
    }
};

"use strict";

const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        "User",
        {
            firstName: {
				type: DataTypes.STRING,
				allowNull: false,
				required: true
			},
            lastName: {
				type: DataTypes.STRING,
				allowNull: false,
				required: true
			},
            email: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true
			},
            password: {
				type: DataTypes.STRING,
				allowNull: false,
				required: true
			}
        },
        {}
    );
    User.associate = function(models) {
        User.belongsToMany(models.Role, { 
			through: {
			  model: models.User_role
			},
			foreignKey: 'user_id'
		});
	};
	User.beforeCreate((user, options) => {
        return bcrypt.hash(user.password, saltRounds).then(hash => {
			user.password = hash;
			user.firstName = user.firstName.toLowerCase();
			user.lastName = user.lastName.toLowerCase();
			user.email = user.email.toLowerCase();
        });
    });
    return User;
};

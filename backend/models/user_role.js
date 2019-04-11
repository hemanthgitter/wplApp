"use strict";
module.exports = (sequelize, DataTypes) => {
    const User_role = sequelize.define(
        "User_role",
        {
            user_id: {
                type: DataTypes.INTEGER,
                unique: "user_role_composite"
            },
            role_id: {
                type: DataTypes.INTEGER,
                unique: "user_role_composite"
            }
        },
        {}
    );
    User_role.associate = function(models) {
        User_role.belongsTo(models.Role, {
            foreignKey: "role_id"
        });
        User_role.belongsTo(models.User, {
            foreignKey: "user_id"
        });
    };
    return User_role;
};

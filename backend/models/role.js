"use strict";
module.exports = (sequelize, DataTypes) => {
    const Role = sequelize.define(
        "Role",
        {
            name: DataTypes.STRING
        },
        {}
    );
    Role.associate = function(models) {
        Role.belongsToMany(models.User, {
            through: {
                model: models.User_role
            },
            foreignKey: "role_id"
        });
    };
    return Role;
};

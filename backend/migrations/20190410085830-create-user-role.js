"use strict";
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("User_roles", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            user_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: "Users",
                    key: "id"
                },
                onUpdate: "cascade",
                onDelete: "cascade",
                unique: 'user_role_composite',
                allowNull: false,
            },
            role_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: "Roles",
                    key: "id"
                },
                onUpdate: "cascade",
                onDelete: "cascade",
                unique: 'user_role_composite',
                allowNull: false,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable("User_roles");
    }
};

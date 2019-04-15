"use strict";
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("Product_categories", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            product_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: "Products",
                    key: "id"
                },
                onUpdate: "cascade",
                onDelete: "cascade",
                unique: 'product_category_composite',
                allowNull: false
            },
            category_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: "Categories",
                    key: "id"
                },
                onUpdate: "cascade",
                onDelete: "cascade",
                unique: 'product_category_composite',
                allowNull: false
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
        return queryInterface.dropTable("Product_categories");
    }
};

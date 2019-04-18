"use strict";
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("Order_items", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            order_id: {
                allowNull: false,
                required: true,
                unique: "order_item_composite",
                references: {
                    model: "Orders",
                    key: "order_id"
                },
                onUpdate: "cascade",
                onDelete: "cascade",
                type: Sequelize.INTEGER
            },
            product_id: {
                type: Sequelize.INTEGER,
				allowNull: false,
                required: true,
                unique: "order_item_composite"
            },
            quantity: {
                type: Sequelize.INTEGER,
				allowNull: false,
				required: true
            },
            price: {
                type: Sequelize.DECIMAL(10,2),
				allowNull: false,
				required: true
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
        return queryInterface.dropTable("Order_items");
    }
};

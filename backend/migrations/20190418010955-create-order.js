"use strict";
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("Orders", {
            order_id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            user_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				required: true
            },
            payment_type: {
				type: Sequelize.STRING,
				allowNull: false,
				required: true
            },
            totalamount: {
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
        return queryInterface.dropTable("Orders");
    }
};

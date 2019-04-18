"use strict";
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable(
            "Products",
            {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: Sequelize.INTEGER
                },
                title: {
                    type: Sequelize.STRING,
                    allowNull: false,
                    required: true
                },
                description: {
                    type: Sequelize.STRING,
                    allowNull: false,
                    required: true
                },
                stock: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    required: true
                },
                price: {
                    type: Sequelize.DECIMAL(10, 2),
                    allowNull: false,
                    required: true
                },
                imageTitle: {
                    type: Sequelize.STRING,
                    allowNull: false,
                    required: true
                },
                image: {
                    type: Sequelize.BLOB('long'),
                    allowNull: false,
                    required: true
                },
                sellerId: {
                    type: Sequelize.INTEGER,
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
				},
				deletedAt: {
                    type: Sequelize.DATE
                }
            },
            {
                timestamps: true,
                paranoid: true
            }
        );
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable("Products");
    }
};

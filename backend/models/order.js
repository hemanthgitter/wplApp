"use strict";
module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define(
        "Order",
        {
            order_id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            user_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				required: true
			},
            payment_type: {
				type: DataTypes.STRING,
				allowNull: false,
				required: true
			},
            totalamount: {
				type: DataTypes.DECIMAL(10,2),
				allowNull: false,
				required: true
			}
        },
        {}
    );
    Order.associate = function(models) {
        Order.hasMany(models.Order_item, {foreignKey: 'order_id'});
        Order.belongsToMany(models.Product, {
            through: {
                model: models.Order_item,
            },
            foreignKey: 'order_id'
        });
    };
    return Order;
};

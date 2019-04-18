"use strict";
module.exports = (sequelize, DataTypes) => {
    const Order_item = sequelize.define(
        "Order_item",
        {
            order_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
                required: true,
                unique: "order_item_composite"
			},
            product_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
                required: true,
                unique: "order_item_composite"
			},
            quantity: {
				type: DataTypes.INTEGER,
				allowNull: false,
				required: true
			},
            price:  {
				type: DataTypes.DECIMAL(10,2),
				allowNull: false,
				required: true
			}
        },
        {}
    );
    Order_item.associate = function(models) {
        // associations can be defined here
        Order_item.belongsTo(models.Order, {foreignKey: 'order_id'})
        Order_item.belongsTo(models.Order, {foreignKey: 'product_id'})
    };
    return Order_item;
};

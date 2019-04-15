"use strict";
module.exports = (sequelize, DataTypes) => {
    const Product_category = sequelize.define(
        "Product_category",
        {
            product_id: {
                type: DataTypes.INTEGER,
                unique: "product_category_composite"
            },
            category_id: {
                type: DataTypes.INTEGER,
                unique: "product_category_composite"
            }
        },
        {}
    );
    Product_category.associate = function(models) {
        Product_category.belongsTo(models.Product, {
            foreignKey: "product_id"
        });
        Product_category.belongsTo(models.Category, {
            foreignKey: "category_id"
        });
    };
    return Product_category;
};

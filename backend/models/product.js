"use strict";
module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define(
        "Product",
        {
			title: {
				type: DataTypes.STRING,
				allowNull: false,
				required: true
			},
			description: {
				type: DataTypes.STRING,
				allowNull: false,
				required: true
			},
			stock: {
				type: DataTypes.INTEGER,
				allowNull: false,
				required: true
			},
			price: {
				type: DataTypes.DECIMAL(10,2),
				allowNull: false,
				required: true
			},
			imageTitle: {
				type: DataTypes.STRING,
				allowNull: false,
				required: true
			},
            image: {
				type: DataTypes.BLOB,
				allowNull: false,
				required: true
			}
        },
        {
			timestamps: true,
			paranoid: true,
			logging: console.log
		}
    );
    Product.associate = function(models) {
        Product.belongsToMany(models.Category, {
            through: {
                model: models.Product_category
            },
            foreignKey: "product_id"
        });
	};
    return Product;
};

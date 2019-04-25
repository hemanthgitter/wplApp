const Order = require("../models").Order;
const Order_item = require("../models").Order_item;
const Product = require("../models").Product;
const message = require("../errorText").messages;

module.exports = {
    purchaseProducts: (req, res, next) => {
        let result = {};
        let status = 200;
        const payload = req.decoded;
        if (payload) {
            for (let i = 0; i < payload.roles.length; ++i) {
                if (payload.roles[i] === "user") {
                    const {
                        user_id,
                        payment_type,
                        totalamount,
                        order_items
                    } = req.body;
                    console.log("user_id : ", user_id);
                    console.log("payment_type : ", payment_type);
                    console.log("totalamount : ", totalamount);
                    console.log("order_items : ", order_items);
                    const productIds = [];
                    const productsWithQuantities = {};
                    order_items.forEach( item => {
                        productIds.push(item['product_id']);
                        productsWithQuantities[item['product_id']] = item['quantity'];
                     });
                    Product.findAll({
                        where: {
                            id: productIds
                        }
                    }).then(products => {
                        console.log("products ::: ", products);
                        let i=0;
                        for(let i=0; i<products.length; ++i){
                            console.log("products[i].stock :", products[i].stock);
                            console.log("productsWithQuantities[products[i].id] :", productsWithQuantities[products[i].id]);
                            if(products[i].stock < productsWithQuantities[products[i].id]){
                                break;
                            }
                        }
                        console.log("i :: ", i);
                        console.log("products.length :: ", products.length);
                        if((i+1) < products.length){
                            status = 201;
                            result.result = {
                                status: status,
                                message: 'Purchase not successful'
                            }
                            res.status(status).json(result);
                        }else{
                            Order.create({
                                user_id: user_id,
                                payment_type: payment_type,
                                totalamount: totalamount
                            })
                                .then(order => {
                                    order_items.forEach(item => {
                                        item["order_id"] = order.order_id;
                                    });
                                    console.log("order_items :: ", order_items);
                                    Order_item.bulkCreate(order_items)
                                        .then(() => {
                                            const productsWithStock = {};
                                            products.forEach( product => {
                                                productsWithStock[product.id] = product.stock;
                                            })
                                            productIds.forEach( productId => {
                                                Product.update(
                                                    {
                                                        stock: productsWithStock[productId] - productsWithQuantities[productId]
                                                    },
                                                    {
                                                        where: { id: productId }
                                                    }
                                                )
                                            });
                                            res.status(status).json(order);
                                        })
                                        .catch(err => {
                                            order.destroy({ force: true });
                                            err.message = message.unknown_error;
                                            next(err);
                                        });
                                })
                                .catch(err => {
                                    next(err);
                                });
                        }
                    })
                    .catch(err => {
                        next(err);
                    });
                }
            }
        } else {
            let err = new Error(message.token_expired);
            err.statusCode = 401;
            next(err);
        }
    },

    purchasedList: (req, res, next) => {
        let result = {};
        let status = 200;
        const payload = req.decoded;
        console.log("req.params.id ::::::::::: ", req.params.id);
        if (payload) {
            Order.findAll({
                where: { user_id: req.params.id },
                include: [{
                    model: Product,
                    through: {
                        model: Order_item
                    }
                }]
            }).then(order => {
                console.log("order ::", order);
                order.forEach(order_item => {
                    order_item.Products.forEach(product => {
                        const buffer = product.image;
                        product.image = buffer.toString();
                    })
                })
                res.status(status).json(order);
            });
        } else {
            let err = new Error(message.token_expired);
            err.statusCode = 401;
            next(err);
        }
    }
};

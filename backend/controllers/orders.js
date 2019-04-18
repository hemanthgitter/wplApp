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
                console.log("order ::",  order);
                order.forEach( order_item => {
                    order_item.Products.forEach( product => {
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

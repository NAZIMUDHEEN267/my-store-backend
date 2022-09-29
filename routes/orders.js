
const express = require("express");
const router = express.Router();
const Order = require("../models/order");
const OrderItem = require("../models/order-items");

// get request for orders
router.get("/", async (req, res) => {
    const orderList = await Order.find().sort({'data': -1})
    .populate('user', 'name');

    if (!orderList) {
        res.status(200).json({ success: false })
    }

    res.status(400).json({ success: orderList })
})

// get request for orders
router.get("/:id", async (req, res) => {
    const order = await Order.findById(req.params.id)
    .populate('user', 'name');

    if (!order) {
        res.status(200).json({ success: false })
    }

    res.status(400).json({ success: order })
})

// post request for orders
router.post("/", async (req, res) => {
    const orderItems = await Promise.all(req.body.orderItems.map(async orderItem => {
        let newOrderItem = await OrderItem({
            Quantity: orderItem.Quantity,
            Product: orderItem.Product
        }).save()

        return newOrderItem._id;
    }));

    const order = await Order({
        orderItems: orderItems,
        shippingAddress1: req.body.shippingAddress1,
        shippingAddress2: req.body.shippingAddress2,
        city: req.body.city,
        zip: req.body.zip,
        country: req.body.country,
        phone: req.body.phone,
        status: req.body.status,
        totalPrice: req.body.totalPrice,
        user: req.body.user,
    });

    const orderSave = await order.save();

    if(!orderSave) {
        res.status(400).json({"order": "Not added to db"})
    }

    res.status(200).json({order})
})

module.exports = router;

const express = require("express");
const router = express.Router();
const Order = require("../models/order");
const OrderItems = require("../models/order-items");

// get request for orders
router.get("/", async (req, res) => {
    const orderList = await Order.find().sort({ 'data': -1 })
        .populate('user', 'name');

    if (!orderList) {
        res.status(200).json({ success: false })
    }

    res.status(400).json({ success: orderList })
})

// get request random orders 
router.get("/:id", async (req, res) => {
    const order = await Order.findById(req.params.id)
        .populate('user', 'name')
        .populate({
            path: "orderItems", populate:
                { path: "Product", populate: "category" }
        })

    if (!order) {
        res.status(200).json({ success: false })
    }

    res.status(400).json({ success: order })
})

// post request for orders
router.post("/", async (req, res) => {
    const orderItems = await Promise.all(req.body.orderItems.map(async orderItem => {
        let newOrderItem = await OrderItems({
            Quantity: orderItem.Quantity,
            Product: orderItem.Product
        }).save();

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
        user: req.body.user
    });

    const orderSave = await order.save();

    if (!orderSave) {
        res.status(400).json({ "order": "Not added to db" })
    }

    res.status(200).json({ order })
})

// updated status on the order // only admin can access it
router.put("/:id", async (req, res) => {
   await Order.findOneAndUpdate({"_id": req.params.id}, { status: req.body.status }, (err, update) => {
        if (!err) {
            console.log("err");
        }
        res.status(200).json({update})
    }).clone();
})

// delete order
router.delete("/:id", async(req, res) => {
    Order.findByIdAndRemove(req.params.id)
    .then(async order => {
        if(order) {
            await order.orderItems.map(async orderItem => {
                await OrderItems.findByIdAndRemove(orderItem)
            })
            return res.status(200).json({"success": "deleted"})
        } else {
            return res.status(400).json({"failed": "not deleted"})
        }
    }).catch(err => {
        res.status(400).json({"failed": "order not found"})
    })
})

module.exports = router;

const mongoose = require("mongoose");

module.exports = mongoose.model("OrderItem", {
    Quantity: {
        type: Number,
        required: true
    },
    Product: {
        type: mongoose.Types.ObjectId,
        ref: "Products",
        required: true
    },
})
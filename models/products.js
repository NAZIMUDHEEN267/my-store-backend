
const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {type: String},
    countInStock: {type: Number}
})

module.exports = mongoose.model("Products", productSchema);
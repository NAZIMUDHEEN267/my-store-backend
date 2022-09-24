
const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    name: {type: String},image: {data: Buffer, contentType: String}, countInStock: {type: Number}
    // name: {
    //     type: String,
    //     required: true
    // },
    // description: {
    //     type: String,
    //     required: true
    // },
    // richDescription: {
    //     type: String,
    //     default: ""
    // },
    // image: {
    //     type: String,
    //     default: ""
    // },
    // images: [{
    //     type: String
    // }],
    // brand: {
    //     type: String
    // },
    // price: {
    //     type: Number,
    //     default: 0
    // }, 
    // category: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Category",
    //     required: true
    // },
    // countInStock: {
    //     type: Number,
    //     required: true,
    //     min: 0,
    //     max: 255
    // },
    // rating: {
    //     type: Number,
    //     default: 0
    // },
    // reviews: {
    //     type: Number,
    //     default: 0
    // },
    // isFeatured: {
    //     type: Boolean,
    //     default: false
    // },
    // dateCreated: {
    //     type: Date,
    //     default: Date.now
    // }
})

module.exports = mongoose.model("Products", productSchema);
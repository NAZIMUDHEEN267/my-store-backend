
const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: String,
    image: String,
    countInStock: {

    }
})

module.exports = mongoose.model("User", userSchema);
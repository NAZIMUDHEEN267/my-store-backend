
const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
    icon: String
})

module.exports = mongoose.model("Category", categorySchema);
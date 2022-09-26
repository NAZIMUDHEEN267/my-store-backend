
const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
    name: {
        type: String
    },
    icon: {
        type: String,
    },
    color: {
        type: String
    }
})

module.exports = mongoose.model("Categories", categorySchema);
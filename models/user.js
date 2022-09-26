
const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: String,
    image: String,
    countInStock: {
        type: Number,
        required: true
    }
})

// virtual for changing default "_id" to "id"
userSchema.virtual("id").get(() => this._id);
userSchema.set('toJSON', {
    virtuals: true,
    transform: function(doc, ret) {
        delete ret._id;
    }
});

module.exports = mongoose.model("Users", userSchema);
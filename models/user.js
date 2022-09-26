
const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    passwdHash: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    apartment: {
        type: String,
        default: ''
    },
    street: {
        type: String,
        default: ''
    },
    zip: {
        type: Number,
        default: ''
    },
    city: {
        type: String,
        default: ''
    },
    country: {
        type: String,
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

const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
   orderItems: [{
    type: mongoose.Types.ObjectId,
    ref: "OrderItem",
    required: true
   }],
   shippingAddress1: {
    type: String,
    required: true
   },
   shippingAddress2: {
    type: String,
    required: true
   },
   zip: {
    type: Number,
    required: true
   },
   country: {
    type: String,   
    required: true
    },
    phone: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: "Pending"
    },
    totalPrice: {
        type: Number
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "Users"
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

// virtual for changing default "_id" to "id"
orderSchema.virtual("id").get(() => this._id);
orderSchema.set('toJSON', {
    virtuals: true,
    transform: function(doc, ret) {
        delete ret._id;
    }
});

module.exports = mongoose.model("Orders", orderSchema);

const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({

})

// virtual for changing default "_id" to "id"
orderSchema.virtual("id").get(() => this._id);
orderSchema.set('toJSON', {
    virtuals: true,
    transform: function(doc, ret) {
        delete ret._id;
    }
});

module.exports = mongoose.model("Order", orderSchema);
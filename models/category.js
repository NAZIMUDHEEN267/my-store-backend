
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

// virtual for changing default "_id" to "id"
categorySchema.virtual("id").get(() => this._id);
categorySchema.set('toJSON', {
    virtuals: true,
    transform: function(doc, ret) {
        delete ret._id;
    }
});

module.exports = mongoose.model("Categories", categorySchema);
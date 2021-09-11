const mongoose = require("mongoose");
const { Schema } = mongoose;

const cartSchema = new Schema({
  products: [
    {
      productId: { type: Schema.Types.ObjectId, ref: "Product" },
      item: { type: Number, required: true },
      isOrdered: {
        type: Boolean,
        default: false,
      },
    },
  ],
  userId: { type: Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Cart", cartSchema);

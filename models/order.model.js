const mongoose = require("mongoose");

const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    payment: {
      totalAmount: {
        type: Number,
        required: true,
      },
      totalDiscount: {
        type: Number,
        default: 0,
      },
      couponDiscount: {
        type: Number,
        default: 0,
      },
      totalPaidAmount: {
        type: Number,
        required: true,
      },
    },
    products: [
      {
        productId: { type: Schema.Types.ObjectId, ref: "Product" },
        item: { type: Number, required: true },
      },
    ],
    addressId: { type: Schema.Types.ObjectId, ref: "Address" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);

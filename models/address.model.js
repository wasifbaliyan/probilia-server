const mongoose = require("mongoose");

const { Schema } = mongoose;

const addressSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    name: {
      type: String,
      required: true,
    },
    street: {
      type: String,
      required: true,
    },
    pinCode: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Address", addressSchema);

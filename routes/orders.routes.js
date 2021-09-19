const express = require("express");
const Cart = require("../models/cart.model");
const Order = require("../models/order.model");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const userId = req.user._id;
    const orders = await Order.find({ userId })
      .populate({
        path: "products.productId",
      })
      .populate({
        path: "addressId",
      });
    if (!orders) {
      return res.status(404).json({ message: "Something went wrong." });
    }
    res.status(200).json({
      message: "Orders fetched successfully.",
      orders,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Something went wrong.",
      error: error.message,
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const userId = req.user._id;
    const orderData = req.body;
    const order = await new Order({ ...orderData, userId });
    await order.save();

    const cart = await Cart.findOne({ userId });
    cart.products = [];
    await cart.save();

    res.status(201).json({
      message: "Order placed successfully.",
      order,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Something went wrong.",
      error: error.message,
    });
  }
});

module.exports = router;

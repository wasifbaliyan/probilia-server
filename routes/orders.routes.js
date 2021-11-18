const express = require("express");
const shortid = require("shortid");
const Razorpay = require("razorpay");
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

router.post("/payment", async (req, res) => {
  try {
    const { amount } = req.body;
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET,
    });

    const options = {
      amount: amount, // amount in smallest currency unit
      currency: "INR",
      receipt: `probilia_order_${shortid.generate()}`,
    };

    const order = await instance.orders.create(options);

    if (!order) return res.status(500).send("Something went wrong.");

    res.status(201).json({
      message: "Payment was successful.",
      order,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong.",
      error: error.message,
    });
  }
});

module.exports = router;

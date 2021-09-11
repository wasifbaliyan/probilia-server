const express = require("express");
const Cart = require("../models/cart.model");
const Product = require("../models/product.model");
const cartMiddleware = require("../middlewares/cart.middleware");

const router = express.Router();

router.get("/", cartMiddleware, async (req, res) => {
  try {
    let cart = req.cart;

    res.status(200).json({
      message: "Cart fetched successfully",
      response: {
        cart,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Something went wrong.",
      error: error.message,
    });
  }
});

router.post("/", cartMiddleware, async (req, res) => {
  try {
    const id = req.body.productId;
    const item = req.body.item;
    let cart = req.cart;

    const product = await Product.findById({ _id: id });
    if (!product) {
      return res.status(404).json({
        message: "Product not found!",
      });
    }

    const foundIndex = cart.products.findIndex(
      (item) => item.productId._id == id
    );
    if (foundIndex !== -1) {
      return res.status(404).json({
        message: "Product already exists.",
      });
    }

    cart.products.push({ ...product, item, productId: id });
    await cart.save();
    console.log();
    res.status(201).json({
      message: "cart item added successfully.",
      response: {
        cart,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Something went wrong.",
      error: error.message,
    });
  }
});

router.delete("/", cartMiddleware, async (req, res) => {
  try {
    const productId = req.body.productId;
    const cart = req.cart;
    const foundIndex = await cart.products.findIndex(
      (item) => item.productId._id == productId
    );
    if (foundIndex === -1) {
      return res.status(404).json({
        message: "Product does not exist in the cart.",
      });
    }

    cart.products.splice(foundIndex, 1);
    await cart.save();

    res.status(200).json({
      message: "cart item removed successfully.",
      response: {
        cart,
      },
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

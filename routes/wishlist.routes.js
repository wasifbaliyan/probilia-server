const express = require("express");
const Wishlist = require("../models/wishlist.model");
const Product = require("../models/product.model");
const wishlistMiddleware = require("../middlewares/wishlist.middleware");
const router = express.Router();

router.get("/", wishlistMiddleware, async (req, res) => {
  try {
    const wishlist = req.wishlist;

    res.status(200).json({
      message: "Wishlist fetched successfully",
      response: {
        wishlist,
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

router.post("/", wishlistMiddleware, async (req, res) => {
  try {
    const id = req.body.productId;
    const wishlist = req.wishlist;

    const product = await Product.findById({ _id: id });
    if (!product) {
      return res.status(404).json({
        message: "Product not found!",
      });
    }

    const foundIndex = wishlist.products.findIndex((item) => item._id == id);
    if (foundIndex !== -1) {
      return res.status(404).json({
        message: "Product already exists.",
      });
    }
    wishlist.products.push(product);
    await wishlist.save();
    res.status(201).json({
      message: "Wishlist item added successfully.",
      response: {
        wishlist,
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

router.delete("/", wishlistMiddleware, async (req, res) => {
  try {
    const productId = req.body.productId;
    const wishlist = req.wishlist;
    const foundIndex = await wishlist.products.findIndex(
      (item) => item._id == productId
    );
    if (foundIndex === -1) {
      return res.status(404).json({
        message: "Product does not exist in the wishlist.",
      });
    }

    wishlist.products.splice(foundIndex, 1);
    await wishlist.save();

    res.status(200).json({
      message: "Wishlist item removed successfully.",
      response: {
        wishlist,
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

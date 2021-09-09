const express = require("express");
const router = express.Router();

const Product = require("../models/product.model");

router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    if (!products) {
      return res.status(404).json({ message: "Something went wrong" });
    }
    res.status(200).json({
      message: "Products fetched successfully.",
      response: {
        products,
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

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const foundProduct = await Product.findById(id);
    if (!foundProduct) {
      return res.status(404).json({
        message: "No product found.",
      });
    }
    res.status(200).json({
      message: "Product fetched successfully.",
      response: {
        product: foundProduct,
      },
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

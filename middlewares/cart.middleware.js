const Cart = require("../models/cart.model");

const cartMiddleware = async (req, res, next) => {
  try {
    const userId = req.user._id;
    let cart = await Cart.findOne({ userId }).populate({
      path: "products.productId",
      select: "name price",
    });
    if (!cart) {
      cart = await new Cart({ userId });
      await cart.save();
    }

    req.cart = cart;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Something went wrong.",
      error: error.message,
    });
  }
};

module.exports = cartMiddleware;

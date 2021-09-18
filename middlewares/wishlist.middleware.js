const Wishlist = require("../models/wishlist.model");
const wishlistMiddleware = async (req, res, next) => {
  try {
    const userId = req.user._id;
    let wishlist = await Wishlist.findOne({ userId }).populate({
      path: "products",
    });
    if (!wishlist) {
      wishlist = await new Wishlist({ userId });
      await wishlist.save();
    }

    req.wishlist = wishlist;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Something went wrong.",
      error: error.message,
    });
  }
};

module.exports = wishlistMiddleware;

const express = require("express");
const Address = require("../models/address.model");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const userId = req.user._id;
    const addresses = await Address.find({ userId });
    if (!addresses) {
      return res.status(404).json({ message: "Something went wrong." });
    }
    res.status(200).json({
      message: "Addresses fetched successfully",
      response: {
        addresses,
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

router.post("/", async (req, res) => {
  try {
    const userId = req.user._id;
    const addressData = req.body;

    const address = await new Address({ ...addressData, userId });
    await address.save();
    res.status(201).json({
      message: "Address created successfully.",
      response: {
        address,
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
    const userId = req.user._id;
    const foundAddress = await Address.find({ userId, _id: req.params.id });
    if (!foundAddress) {
      return res.status(404).json({ message: "Address not found." });
    }
    res.status(200).json({
      message: "Address fetched successfully.",
      response: {
        foundAddress,
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

router.put("/:id", async (req, res) => {
  try {
    const userId = req.user._id;
    const updatedData = req.body;
    const updatedAddress = await Address.findOneAndUpdate(
      { userId, _id: req.params.id },
      { ...updatedData, userId },
      { new: true }
    );

    res.status(200).json({
      message: "Address updated successfully.",
      response: {
        updatedAddress,
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

router.delete("/:id", async (req, res) => {
  try {
    const userId = req.user._id;
    const removedAddress = await Address.findOneAndDelete({
      userId,
      _id: req.params.id,
    });

    res.status(202).json({
      message: "Address removed successfully.",
      response: {
        removedAddress,
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

const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const generateAuthToken = require("../utils/generateAuthToken");
const verifyAuthentication = require("../middlewares/verify-auth.middleware");
const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { email } = req.body;
    const foundUser = await User.findOne({ email });
    if (foundUser) {
      return res.status(400).json({
        message: "User with this email already exists.",
      });
    } else {
      const user = await new User(req.body);
      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(user.password, salt);
      await user.save();

      const token = generateAuthToken(user._id);

      return res.status(201).json({
        message: "User created successfully.",
        response: {
          name: user.name,
          email: user.email,
          token,
        },
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong!",
      error: error.message,
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      return res.status(403).json({
        message: "Incorrect email or password!",
      });
    } else {
      const isPasswordValid = bcrypt.compare(password, foundUser.password);
      if (!isPasswordValid) {
        return res.status(403).json({
          message: "Incorrect email or password.",
        });
      }

      const token = generateAuthToken(foundUser._id);

      return res.status(200).json({
        message: "Logged in successfully.",
        response: {
          token,
          name: foundUser.name,
          email: foundUser.email,
        },
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong!",
      error: error.message,
    });
  }
});

router.get("/self", verifyAuthentication, async (req, res) => {
  try {
    const user = req.user;
    res.status(200).json({
      response: {
        email: user.email,
        name: user.name,
      },
      message: "Successfully fetched user info.",
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

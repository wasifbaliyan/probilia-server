const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: "Email address is required.",
    unique: true,
  },
  name: {
    type: String,
    required: "Name is required.",
  },
  password: {
    type: String,
    required: "Password is required.",
  },
});

module.exports = mongoose.model("User", userSchema);

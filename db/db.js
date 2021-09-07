const mongoose = require("mongoose");

async function connectToDB(url) {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.info("Connected to Mobilia DB");
  } catch (error) {
    console.error("Something went wrong", error);
  }
}

module.exports = connectToDB;

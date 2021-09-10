const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectToDB = require("./db/db");
const auth = require("./routes/auth.routes");
const products = require("./routes/products.routes");
const addresses = require("./routes/addresses.routes");
const verifyAuthentication = require("./middlewares/verify-auth.middleware");
const app = express();

connectToDB(process.env.DB_URL);

app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  try {
    res.status(200).json({
      response: "Welcome to Mobilia API!",
      message: "Data fetched successfully.",
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong.",
    });
  }
});

app.use("/auth", auth);
app.use("/api/products", products);

app.use(verifyAuthentication);

app.use("/api/addresses", addresses);

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening at port : ${port}`));

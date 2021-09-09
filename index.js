const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectToDB = require("./db/db");
const auth = require("./routes/auth.routes");
const products = require("./routes/products.routes");
const app = express();

connectToDB(process.env.DB_URL);

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json("Welcome to Mobilia API!");
});

app.use("/auth", auth);
app.use("/api/products", products);

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening at port : ${port}`));

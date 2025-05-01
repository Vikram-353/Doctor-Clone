const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const doctorRoutes = require("./routes/doctorRoutes");
const connectDB = require("./config/db");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api", doctorRoutes);

app.get("/", (req, res) => {
  res.send("API WORKING GREAT");
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

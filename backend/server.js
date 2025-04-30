const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const doctorRoutes = require("./routes/doctorRoutes");
const connectDB = require("./config/db");

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use("/api", doctorRoutes);

app.listen(5000, () => {
  console.log("Server started on port 5000");
});

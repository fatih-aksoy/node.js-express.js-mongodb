"use strict";

const express = require("express");
const app = express();
require("dotenv").config();
require("./src/config/databaseConnection")
const port = process.env.PORT || 8000;
const todoRouter = require("./src/routers/todoRouter");

// thunder da new request yaptigimizda icerigi gormek icin yazdik.
app.use(express.json());

app.use("/api", todoRouter);

// API main page. bunu thunder https://localhost:8000 dinle, istek at. TEST
app.get("/", (req, res) => {
  res.send("Welcome....");
});

app.listen(port, () => {
  console.log(`Server ${port} port is working...`);
});

// App setup
require('dotenv').config();
const express = require('express');
const app = express();
const port = 4000;
const mongoose = require('mongoose');

//mongoose setup
let stocks = new mongoose.Schema({
  currentStocks = [];
})
let stockModel = mongoose.model("currentStock", stocks);
// app deploy
app.listen(port,()=>{
  console.log(`API waiting for request on port ${port}`);
})

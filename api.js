// App setup
require('dotenv').config();
const express = require('express');
const app = express();
const http = require('http').Server(app);
const port = 4000;
const mongoose = require('mongoose');
const fetch = require('node-fetch');
const io = require('socket.io')(http);
//mongoose setup
mongoose.connect(process.env.MONGO_URI)
.then(
  () => {console.log("Datbase Connected")},
  err =>{console.log(`Error connecting to database ${err}`)}
)
let stocks = new mongoose.Schema({
  currentStocks:Array
})
let stockModel = mongoose.model("currentStock", stocks);
// Socket setup
io.on('connection',()=>{
  io.on('add stock', (stock)=>{
    console.log(stock);
  })
})

// app deploy
http.listen(port,()=>{
  console.log(`API waiting for request on port ${port}`);
})

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
function getDoc(){
  return stockModel
          .findOne()
          .then((doc)=>{
            return doc;
          })
        }
// Socket setup
// Socket Connection Event
io.on('connection',()=>{
  console.log("User Connected");
  // After connection event emit stock information on current stocks
  getDoc()
    .then((doc)=>{
      let stockArr = [];
      for(let i = 0; i < doc.currentStocks.length;i++){
        stockArr.push(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${doc.currentStocks[i]}&apikey=${process.env.STOCK_API}`)
      }
      const grabContent = url => fetch(url)
        .then((res)=>{return res.json()})
        .then((data)=>{return data});
      Promise
            .all(stockArr.map(grabContent))
            .then((data)=>{io.sockets.emit("get current stocks",data)});
  })
})

// app deploy
http.listen(port,()=>{
  console.log(`API waiting for request on port ${port}`);
})

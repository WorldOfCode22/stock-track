// App setup
require('dotenv').config();
const express = require('express');
const app = express();
const http = require('http').Server(app);
const port = 4000;
const mongoose = require('mongoose');
const fetch = require('node-fetch');
const io = require('socket.io')(http);
const path = require('path');
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
io.on('connection',(socket)=>{
  function refresh(){
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
    }).catch(err=>{console.log(err);io.sockets.emit("ERROR", "API ERROR")})
  }
    function isStockInArray(doc, stock){
      if(doc.currentStocks.indexOf(stock) === -1){
        return false;
      }else{
        io.sockets.emit("ERROR", "Stock Already Created");
      }
    }
    function vaildStock(stock){
      return fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stock}&apikey=${process.env.STOCK_API}`)
        .then(res =>{return res.json()})
        .then(data =>{
          if(data["Error Message"] === undefined){
            return true;
          }else{
            io.sockets.emit("ERROR", "Not A Vaild Stock");
          }
        })
        .catch(err=>{console.log(err)})
    }
    function addStock(doc, stock){
      doc.currentStocks.push(stock);
      return doc
        .save()
        .then(doc=>{
          io.sockets.emit("refresh");
        })
        .catch(err=>{console.log(err);io.sockets.emit("ERRER", "SERVER ERROR")})
    }
  // After connection event emit stock information on current stocks
    refresh();
socket.on("remove stock", (stock)=>{
  getDoc()
    .then((doc)=>{
      if(doc.currentStocks.indexOf(stock)=== -1){
        io.sockets.emit("ERROR", "Stock Not In Database Please Refresh Page");
      }else{
        doc.currentStocks.splice(doc.currentStocks.indexOf(stock),1);
        doc.save()
        .then(()=>{
          io.sockets.emit("refresh");
        }).catch(err=>{console.log(err);io.sockets.emit("ERROR", "SERVER ERROR")})
      }
    })
})
socket.on('refresh',()=>{
  refresh();
})
socket.on("add stock", (stock)=>{
  stockModel
    .findOne()
    .then(doc =>{
      if(isStockInArray(doc, stock) === false){
        vaildStock(stock)
          .then(bool =>{
            if(bool){
              addStock(doc, stock)
            }else{
              io.sockets.emit("ERROR", "No Such Stock");
            }
          }).catch(err=>{console.log(err); io.sockets.emit("ERROR", "SERVER ERROR")})
      }
    }).catch(err=>{console.log(err); io.sockets.emit("ERROR", "SERVER ERROR")})
})
})
app.use(express.static(path.join(__dirname, 'client/build')));
app.get("/",(req,res)=>{
  console.log("what");
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

// app deploy
http.listen(process.env.PORT || port,()=>{
  console.log(`API waiting for request on port ${process.env.PORT}`);
})

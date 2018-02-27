// App setup
require('dotenv').config();
const express = require('express');
const app = express();
const port = 4000;
const mongoose = require('mongoose');

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
// route setup
app.get('/stocks',()=>{

});
// app deploy
app.listen(port,()=>{
  console.log(`API waiting for request on port ${port}`);
})

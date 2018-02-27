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
app.get('/stocks/add/:stock',(req,res)=>{
  stockModel.count()
  .then((count)=>{
    if(count === 1){
      stockModel.findOne()
      .then((doc)=>{
        doc.currentStocks.push(req.params.stock);
        return doc.save();
      }).then((doc)=>{
        res.json(doc);
        return doc;
      }).catch((err)=>{res.json({error:err})})
    }else if(count === 0){
      new stockModel({
        currentStocks: [req.params.stock]
      }).save.then((doc)=>{
        res.json(doc);
      })
    }else{
      res.json({message: "Database Error"});
    }
  })
})
app.get('/stocks',(req,res)=>{
  stockModel.count()
  .then((count)=>{
    if(count === 1){
      stockModel.findOne().then((doc)=>{
        res.json({currentStocks: doc.currentStocks});
      })
    }else if (count === 0){
      new stockModel({}).save.then(()=>{
        res.json({message: "No Stocks Active"});
      })
    }else{
      console.log("Too Many Collections In DB");
      res.json({error: "Database Error"});
    }
  })
});
// app deploy
app.listen(port,()=>{
  console.log(`API waiting for request on port ${port}`);
})

// App setup
const express = require('express');
const app = express();
const port = 4000;

//mongoose setup

app.listen(port,()=>{
  console.log(`API waiting for request on port ${port}`);
})

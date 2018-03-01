import React, { Component } from 'react';
import Graph from 'chart.js';
export default class Chart extends Component{
  formatData(){
    let self = this;
    if(this.props.stocks){
    let objArray = []
    for(let i = 0; i < this.props.stocks.length; i++){
      let obj = {x:[], y:[]};
      let keys = Object.keys(this.props.stocks[i]["Time Series (Daily)"]);
      console.log(this.props.stocks[i]["Time Series (Daily)"]);
      keys.forEach(function keyFilter(e, z){
        obj.x.push(keys[z]);
        obj.y.push(self.props.stocks[i]["Time Series (Daily)"][keys[z]]["2. high"])
      })
      obj.name = this.props.stocks[i]["Meta Data"]["2. Symbol"];
      objArray.push(obj);
    }
    console.log(objArray);
  }
}
  setupChart(){
    let context = document.getElementById("chart");
    let lineChart = new Graph(context,{
      type: 'line',
      data: this.props.stocks
    });
  }
  render(){
    this.formatData()
    return(
      <canvas id={"chart"} />
    )
  }
}

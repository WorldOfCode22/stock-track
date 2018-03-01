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
    return objArray;
  }
}
  setupChart(){
    console.log(this.formatData())
    let lineChart = new Graph(document.getElementById('chart'),{
      type: 'line',
      data: {
        labels: this.formatData()[0].x,
        datasets: [{
          data: this.formatData()[0].y,
          label: this.formatData()[0].name
        }]
      }
    })
  }
  render(){
    if(this.props.stocks){
    this.setupChart();
  }
    return(
      <canvas id={"chart"} />
    )
  }
}

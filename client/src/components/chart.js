import React, { Component } from 'react';
import Graph from 'chart.js';
export default class Chart extends Component{
  formatData(){
    let self = this;
    let obj = {};
    let keys = Object.keys(this.props.stocks[0]["Time Series (Daily)"])
    function formatDatasets(){
      let dataset = [];
      let dataObj = {};
      let colors = ["green", "#40e0d0", "#F0E130", "#4169e1", "#ff00ff", "#e6e6fa"]
      for(let i = 0; i < self.props.stocks.length; i++){
        dataObj.label = self.props.stocks[i]["Meta Data"]["2. Symbol"];
        dataObj.data = [];
        keys.forEach(function getVals(c){
          dataObj.data.push(self.props.stocks[i]["Time Series (Daily)"][c]["2. high"]);
          //console.log((x+3)%3);
          dataObj.fill = false;
        })
        dataObj.borderColor = colors[(i+colors.length)%colors.length];
        dataObj.backgroundColor = colors[(i+colors.length)%colors.length];
        dataset.push(dataObj);
        dataObj = {};
      }
      return dataset;
    }
    obj.labels = keys.reverse();
    obj.datasets = formatDatasets();
    console.log(obj.datasets);
    return obj;
}
  setupChart(){
    console.log(this.formatData())
    new Graph(document.getElementById('chart'),{
      type: 'line',
      data: {
        labels: this.formatData().labels,
        datasets: this.formatData().datasets
      },
      options: {
        title: {
          display: "true",
          text: "Stocks",
          fontColor: "white"
        }
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

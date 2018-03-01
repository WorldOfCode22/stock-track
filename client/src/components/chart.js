import React, { Component } from 'react';
import Graph from 'chart.js';
export default class Chart extends Component{
  formatData(){
    let self = this;
    let obj = {};
    let keys = Object.keys(this.props.stocks[0]["Time Series (Daily)"])
    function getLabels(){
      return keys;
    }
    function formatDatasets(){
      let dataset = [];
      let dataObj = {};
      for(let i = 0; i < self.props.stocks.length; i++){
        dataObj.label = self.props.stocks[i]["Meta Data"]["2. Symbol"];
        dataObj.data = [];
        keys.forEach(function getVals(c){
          dataObj.data.push(self.props.stocks[i]["Time Series (Daily)"][c]["2. high"])
        })
        dataset.push(dataObj);
        dataObj = {};
      }
      return dataset;
    }
    obj.labels = keys;
    obj.datasets = formatDatasets();
    return obj;
}
  setupChart(){
    console.log(this.formatData())
    let lineChart = new Graph(document.getElementById('chart'),{
      type: 'line',
      data: {
        labels: this.formatData().labels,
        datasets: this.formatData().datasets
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

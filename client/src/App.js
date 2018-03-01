import React, { Component } from 'react';
import openSocket from 'socket.io-client';
import StockCard from './components/stock-card';
import AddCard from './components/add-card';
import Chart from './components/chart'
class App extends Component {
  constructor(){
    super();
    let socket = openSocket('http://localhost:4000');
    socket.on("get current stocks", (stocks)=>{
      this.jsxifyStocks(stocks);
    })
    socket.on("refresh", ()=>{
      socket.emit("refresh")
    })
    this.state={socket};
  }
  jsxifyStocks(stockArr){
    let jsxArray = []
    for(let i = 0; i<stockArr.length;i++){
      jsxArray.push(<StockCard key={i} stock={stockArr[i]} socket={this.state.socket} />);
    }
    this.setState({stocks:jsxArray, stockArr});
  }
  render() {
    return (
      <div className="App">
        <Chart stocks={this.state.stockArr}/>
        {this.state.stocks}
        <AddCard socket={this.state.socket} />
      </div>
    );
  }
}

export default App;

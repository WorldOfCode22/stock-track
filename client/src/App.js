import React, { Component } from 'react';
import openSocket from 'socket.io-client';
import StockCard from './components/stock-card';
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
    this.setState({stocks:jsxArray});
  }
  render() {
    return (
      <div className="App">
        {this.state.stocks}
      </div>
    );
  }
}

export default App;

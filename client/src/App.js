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
      jsxArray.push(<StockCard key={i} stock={stockArr[i]} socket={this.state.socket} color={"#DE98B2"} />);
    }
    this.setState({stocks:jsxArray, stockArr});
  }
  render() {
    let divStyle = {
      display: "grid",
      width: "100%",
      gridTemplateColumns: "repeat(4, 1fr)",
      gridGap: "10px"
    }
    return (
      <div className="App">
        <Chart stocks={this.state.stockArr}/>
        <div style={divStyle}>
          <AddCard socket={this.state.socket} color={"#DE98B2"} />
          {this.state.stocks}
        </div>
      </div>
    );
  }
}

export default App;

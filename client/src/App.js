import React, { Component } from 'react';
import openSocket from 'socket.io-client';
import StockCard from './components/stock-card';
import AddCard from './components/add-card';
import Chart from './components/chart'
class App extends Component {
  constructor(){
    super();
    this.waitMessage = this.waitMessage.bind(this);
    let socket = openSocket();
    socket.on("get current stocks", (stocks)=>{
      this.jsxifyStocks(stocks);
    })
    socket.on("refresh", ()=>{
      socket.emit("refresh")
    })
    socket.on("ERROR", (message)=>{
      this.setState({message});
    })
    this.state={socket};
  }
  jsxifyStocks(stockArr){
    let jsxArray = []
    for(let i = 0; i<stockArr.length;i++){
      jsxArray.push(<StockCard key={i} stock={stockArr[i]} socket={this.state.socket} color={"#DE98B2"} func={this.waitMessage} />);
    }
    this.setState({stocks:jsxArray, stockArr, message:''});
  }
  waitMessage(){
    this.setState({message:"Operation In Progress"})
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
        <h1 style={{color:"white",textAlign: "center"}}>{this.state.message}</h1>
        <div style={divStyle}>
          <AddCard socket={this.state.socket} color={"#DE98B2"} func={this.waitMessage}/>
          {this.state.stocks}
        </div>
        <h5 style={{textAlign: "center"}}><a href="https://worldofcode22.github.io/">Made By Sloan Gwaltney</a></h5>
      </div>
    );
  }
}

export default App;

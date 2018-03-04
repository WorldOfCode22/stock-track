import React, { Component } from 'react';
import openSocket from 'socket.io-client';
import StockCard from './components/stock-card';
import AddCard from './components/add-card';
import Chart from './components/chart'
class App extends Component {
  constructor(){
    super();
    this.waitMessage = this.waitMessage.bind(this);
    let socket = openSocket('');
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
      jsxArray.push(<StockCard key={i} stock={stockArr[i]} socket={this.state.socket} color={"#333366"} func={this.waitMessage} />);
    }
    this.setState({stocks:jsxArray, stockArr, message:''});
  }
  waitMessage(){
    this.setState({message:"Operation In Progress"})
  }
  render() {
    let divStyle={
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      width: '100%',
      gridGap: '20px'
    }
    return (
      <div className="App container" style={{backgroundColor: 'white'}}>
        <header className="jumbotron" style={{backgroundColor:"#7799ff"}}>
          <h1 className="text-center">Stock Tracker</h1>
          <h3 className="text-center">A Chart Displaying A 100 Day History of Closing High</h3>
        </header>
        <Chart stocks={this.state.stockArr}/>
        <h1 style={{textAlign: "center"}}>{this.state.message}</h1>
        <div style={divStyle}>
          <AddCard socket={this.state.socket} color={"#333366"} func={this.waitMessage}/>
          {this.state.stocks}
        </div>
        <footer style={{backgroundColor: '#7799ff'}}>
          <h5 style={{textAlign: "center"}}>Made with passion, love, and purpose by:</h5>
          <h5 style={{textAlign: "center"}}><a style={{color:'black'}} href="https://worldofcode22.github.io/">Sloan Gwaltney(worldofcode22@gmail.com)</a></h5>
        </footer>
      </div>
    );
  }
}

export default App;

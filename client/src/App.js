import React, { Component } from 'react';
import openSocket from 'socket.io-client';

class App extends Component {
  constructor(){
    super();
    let socket = openSocket('http://localhost:4000');
    socket.on("get current stocks", (stocks)=>{
      console.log(stocks);
    })
    this.state={socket};
  }
  render() {
    return (
      <div className="App">

      </div>
    );
  }
}

export default App;

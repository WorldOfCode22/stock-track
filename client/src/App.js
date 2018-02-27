import React, { Component } from 'react';
import openSocket from 'socket.io-client';

class App extends Component {
  constructor(){
    super();
    this.state={socket:openSocket('http://localhost:4000')};
  }
  render() {
    return (
      <div className="App">

      </div>
    );
  }
}

export default App;

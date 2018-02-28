import React, { Component } from 'react';

export default class StockCard extends Component{
  render(){
    console.log(this.props);
    const divStyle = {
      backgroundColor: this.props.color,
      textAlign: "center"
    }
    return(
      <div style={divStyle}>
        <h1>{this.props.stock["Meta Data"]["2. Symbol"]}</h1>
        <button onClick={()=>{this.props.socket.emit("remove stock", this.props.stock["Meta Data"]["2. Symbol"])}}>remove</button>
      </div>
    )
  }
}

import React, { Component } from 'react';

export default class StockCard extends Component{
  render(){
    console.log(this.props);
    const divStyle = {
      backgroundColor: this.props.color,
      textAlign: "center",
      borderRadius: "15px",
      opacity: "0.8"
    }
    const buttonStyle = {
      backgroundColor: "red",
      color:"white",
      borderRadius:"5px"
    }
    return(
      <div style={divStyle}>
        <h1>{this.props.stock["Meta Data"]["2. Symbol"]}</h1>
        <button style={buttonStyle} onClick={()=>{this.props.socket.emit("remove stock", this.props.stock["Meta Data"]["2. Symbol"]);this.props.func()}}>Remove!</button>
      </div>
    )
  }
}

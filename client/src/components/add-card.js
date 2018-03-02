import React, { Component } from 'react';

export default class AddCard extends Component{
  render(){
    let divStyle={
      backgroundColor: this.props.color,
      textAlign: "center",
      borderRadius: "15px",
      opacity: "0.8"
    }
    let btnStyle = {
      backgroundColor: "blue",
      color: "white",
      borderRadius: "5px"
    }
    return(
      <div style={divStyle}>
        <h3>Add Stock To Track</h3>
        <input id="add-stock" type="text" /><br/>
        <button style={btnStyle} onClick={()=>{this.props.socket.emit("add stock", document.getElementById("add-stock").value);this.props.func()}}>Add Stock!</button>
      </div>
    )
  }
}

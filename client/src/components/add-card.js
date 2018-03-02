import React, { Component } from 'react';

export default class AddCard extends Component{
  render(){
    let divStyle={
      backgroundColor: this.props.color,
      textAlign: "center",
      borderRadius: "15px"
    }
    return(
      <div style={divStyle}>
        <h3>Add Stock To Track</h3>
        <input id="add-stock" type="text" /><br/>
        <button onClick={()=>{this.props.socket.emit("add stock", document.getElementById("add-stock").value)}}>Add Stock!</button>
      </div>
    )
  }
}

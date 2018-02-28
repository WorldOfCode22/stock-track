import React, { Component } from 'react';

export default class AddCard extends Component{
  render(){
    return(
      <div>
        <h3>Add Stock To Track</h3>
        <input id="add-stock" type="text" /><br/>
        <button onClick={()=>{this.props.socket.emit("add stock", document.getElementById("add-stock").value)}}>Add Stock!</button>
      </div>
    )
  }
}

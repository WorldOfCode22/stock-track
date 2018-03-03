import React, { Component } from 'react';

export default class AddCard extends Component{
  render(){
    let divStyle={
      backgroundColor: this.props.color,
      textAlign: "center",
    }
    return(
      <div style={divStyle}>
        <h3 style={{color:"white"}}>Add Stock To Track</h3>
          <input className='form-control' id="add-stock" type="text" /><br/>
        <button className={'btn btn-primary'} onClick={()=>{this.props.socket.emit("add stock", document.getElementById("add-stock").value.toUpperCase());this.props.func()}}>Add Stock!</button>
      </div>
    )
  }
}

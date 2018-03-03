import React, { Component } from 'react';

export default class StockCard extends Component{
  render(){
    console.log(this.props);
    const divStyle = {
      backgroundColor: this.props.color,
      textAlign: "center"
    }

    return(
      <div  style={divStyle}>
        <div>
        <h3 style={{color:"white"}}>{this.props.stock["Meta Data"]["2. Symbol"]}</h3>
        <button className='btn btn-danger' onClick={()=>{this.props.socket.emit("remove stock", this.props.stock["Meta Data"]["2. Symbol"]);this.props.func()}}>Remove!</button>
        </div>
      </div>
    )
  }
}

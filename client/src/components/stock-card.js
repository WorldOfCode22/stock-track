import React, { Component } from 'react';

export default class StockCard extends Component{
  render(){
    divStyle = {
      "backgroundColor": this.props.color
    }
    return(
      <div style={divStyle}>
      </div>
    )
  }
}

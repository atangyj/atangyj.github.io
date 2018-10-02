import React from 'react';

const style = {
    position: 'absolute',
    bottom: '25px',
    right: '20px',
    border: '0',
    borderRadius: '3px',
    height: '30px',
    width: '80px'
}

export class RandomButton extends React.Component {
  render(){
    return (
      <button style = {style} onClick = {this.props.onClick}> New Quote</button>
    )
  }
}

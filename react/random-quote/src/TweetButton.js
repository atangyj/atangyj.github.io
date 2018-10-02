import React from 'react';
import tweet from './Twitter_Social_Icon_Rounded_Square_White.png';

const style = {
    position: 'absolute',
    bottom: '25px',
    left: '20px',

}

const styleBtn = {
  borderRadius: '1px',
  width: '30px',
  height: '30px'
}

export class TweetButton extends React.Component{
  render(){
    return (

        <a id="tweet-btn" onClick = {this.props.onClick} style={style}><img src={tweet} alt="shit" style={styleBtn}/></a>

    )
  }
}

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import clap from './sounds/bank1/clap.wav';
import boom from './sounds/bank1/boom.wav';
import hihat from './sounds/bank1/hihat.wav';
import kick from './sounds/bank1/kick.wav';
import openhat from './sounds/bank1/openhat.wav';
import ride from './sounds/bank1/ride.wav';
import snare from './sounds/bank1/snare.wav';
import tink from './sounds/bank1/tink.wav';
import tom from './sounds/bank1/tom.wav';

import clap2 from './sounds/bank2/clap.wav';
import boom2 from './sounds/bank2/boom.wav';
import hihat2 from './sounds/bank2/hihat.wav';
import kick2 from './sounds/bank2/kick.wav';
import openhat2 from './sounds/bank2/openhat.wav';
import ride2 from './sounds/bank2/ride.wav';
import snare2 from './sounds/bank2/snare.wav';
import tink2 from './sounds/bank2/tink.wav';
import tom2 from './sounds/bank2/tom.wav';

const soundBank = [
  { keyCode: 81,
    key: 'Q',
    sound: 'Clap',
    bank_one: clap,
    bank_two: clap2
  },

  { keyCode: 87,
    key: 'W',
    sound: 'Boom',
    bank_one: boom,
    bank_two: boom2
  },

  { keyCode:69,
    key: 'E',
    sound: 'Hihat',
    bank_one: hihat,
    bank_two: hihat2
  },

  { keyCode:65,
    key: 'A',
    sound: 'Kick',
    bank_one: kick,
    bank_two: kick2
  },

  { keyCode:83,
    key: 'S',
    sound: 'Openhat',
    bank_one: openhat,
    bank_two: openhat2
  },

  { keyCode:68,
    key: 'D',
    sound: 'Ride',
    bank_one: ride,
    bank_two: ride2
  },

  { keyCode: 90,
    key: 'Z',
    sound: 'Snare',
    bank_one: snare,
    bank_two: snare2
  },

  { keyCode: 88,
    key: 'X',
    sound: 'Tink',
    bank_one: tink,
    bank_two: tink2
  },

  { keyCode:67,
    key: 'C',
    sound: 'Tom',
    bank_one: tom,
    bank_two: tom2
  }

];

class SoundDescription extends React.Component {
  render(){
    return(
      <p>{this.props.soundName}</p>
    )
  }
}

class BankControl extends React.Component {
  render(){
    return(
      <button onClick={this.props.onClick}>Bank Switcher</button>
    )
  }
}

class DrumPad extends React.Component {
  render(){
    return(
      <div onClick={this.props.onClick}>
        <span>{this.props.clip}</span>
        <audio ref={this.props.soundRef}>
          <source src={this.props.source} type="audio/wav" />
        </audio>
      </div>
    )
  }
}


function VolumeControl(props){
  return(
    <input type="range" min="0" max="1" step=".1" onInput={props.handleScroll}/>
  )
}

function TurnOff(props){
  return(
    <label className="switch" >
      <input type="checkbox" onChange={props.onToggle}/>
      <span className="slider round"></span>
    </label>
  )
}

const bank_one = soundBank.map(sound => sound.bank_one);
const bank_two = soundBank.map(sound => sound.bank_two);

class Drum extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      bank: bank_one,
      isBankOne: true,
      sound: null,
      volume: 1,
      volumeOff: false
    }
    this.Ref = React.createRef();

    this.handleClick = this.handleClick.bind(this);
    this.switchBank = this.switchBank.bind(this);
    this.constrolVolume = this.constrolVolume.bind(this);
    this.offVolume = this.offVolume.bind(this);
  }

  handleClick(i){
    // this.Ref.current.volume = this.state.volume;
    this.Ref.current.load();
    this.Ref.current.play();
    console.log(this.Ref.current)
  }

  switchBank(){
    this.setState({
      bank: this.state.isBankOne? bank_two: bank_one,
      isBankOne: !this.state.isBankOne});
  }

  constrolVolume(e){
    this.setState({volume: Number(e.target.value)});
  }

  offVolume(e){
    this.setState({volumeOff: !this.state.volumeOff});
  }

  renderDrumPad(i){
    return (
      <DrumPad soundRef={this.Ref} source={this.state.bank[i]} onClick={this.handleClick} clip={soundBank[i].key} />
    )
  }

  render(){
    return(
      <div className="container-main">
        <div className="container-left">
          {this.renderDrumPad(0)}
          {this.renderDrumPad(1)}
          {this.renderDrumPad(2)}
          {this.renderDrumPad(3)}
          {this.renderDrumPad(4)}
          {this.renderDrumPad(5)}
          {this.renderDrumPad(6)}
          {this.renderDrumPad(7)}
          {this.renderDrumPad(8)}
        </div>
        <div className="container-right">
          <SoundDescription soundName = {this.state.sound}/>
          <BankControl onClick = {this.switchBank} />
          <VolumeControl handleScroll = {this.constrolVolume} />
          <TurnOff onToggle = {this.offVolume}/>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<Drum />, document.getElementById('root'));

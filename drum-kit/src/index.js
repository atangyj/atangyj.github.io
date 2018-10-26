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


const bank_one = soundBank.map(sound => sound.bank_one);
const bank_two = soundBank.map(sound => sound.bank_two);

class DrumPad extends React.Component {
  render(){
    return(
      <span data-key={this.props.idx} onClick={this.props.onClick}>{this.props.keyname}</span>
    )
  }
}


function VolumeControl(props){
  return(
    <div onChange={props.onChange}>
      <input type="range" min="0" max="1" step="0.1"/>
    </div>
  )
}

function TurnOffVolume(props){
  return(
    <div>
      <label className="switch" onClick={props.onClick}>
        <input type="checkbox"/>
        <span className="slider round"></span>
      </label>
    </div>
  )
}


class Drum extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      display: null,
      source: null,
      isBankOne: true,
      volume: 1,
      isOn: true,
    }

    this.Ref = React.createRef();
    this.pressPad = this.pressPad.bind(this);
    this.setSource = this.setSource.bind(this);
    this.playSound = this.playSound.bind(this);
    this.switchBank = this.switchBank.bind(this);
    this.controlVolume = this.controlVolume.bind(this);
    this.turnOffVolume = this.turnOffVolume.bind(this);
  }

  pressPad(e){
    this.setSource(e);
    this.playSound();
  }

  setSource(e){
    if(this.state.isBankOne){
      this.setState({
        source: bank_one[Number(e.target.getAttribute('data-key'))]
      })
    } else {
      this.setState({
        source: bank_two[Number(e.target.getAttribute('data-key'))]
      })
    }
  }

  playSound(){
    this.Ref.current.volume = this.state.volume;
    this.Ref.current.load();
    this.Ref.current.play();
  }

  switchBank(){
    this.setState({isBankOne: !this.state.isBankOne});
  }

  controlVolume(e){
    this.setState({volume: Number(e.target.value)});
  }

  turnOffVolume(){
    this.setState({
      volume: 0,
      isOn: !this.state.isOn
    })
  }

  render(){
    return(
      <div className="container-main">
        <div className="container-display">
          <p>{this.state.display}</p>
        </div>

        <div className="container-drum-pads">
          <DrumPad idx="0" keyname={soundBank[0].key} onClick={this.pressPad}/>
          <DrumPad idx="1" keyname={soundBank[1].key} onClick={this.pressPad}/>

          <audio ref={this.Ref}>
            <source src={this.state.source} type="audio/wav" />
          </audio>
        </div>

        <div className="container-settings">
          <button type="button" onClick={this.switchBank}>Bank 1</button>
          <button type="button" onClick={this.switchBank}>Bank 2</button>

          <VolumeControl onChange = {this.controlVolume} />
          <TurnOffVolume onClick = {this.turnOffVolume} />
        </div>
      </div>
    )
  }
}

ReactDOM.render(<Drum />, document.getElementById('root'));

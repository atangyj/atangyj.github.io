import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const defaultSetting = {
  session_length: 25,
  break_length: 5
};


function SessionSetting(props){
  return(
    <div>
      <div id="session-label">Session Length</div>
      <span id="session-length">{props.session_length}</span>
      <i className="material-icons" onClick={props.pressIncrement}>add</i>
      <i className="material-icons" onClick={props.pressDecrement}>remove</i>
    </div>
  )
}

function BreakSetting(props){
  return(
    <div>
      <div id="break-label">Break Length</div>
      <span id="break-label">{props.break_length}</span>
    </div>
  )
}

function TimerDisplay(props){
  return(
    <div>
      <div id="time-label">time-label</div>
      <span id="time-left">{props.time_left}</span>
    </div>
  )
}

function PlayControl(props){
  return <i className="material-icons">{props.isPlaying?"stop":"play_circle_outline"}</i>;
}

function ResetControl(props){
  return <i className="material-icons">replay</i>;
}


class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      session_length: defaultSetting.session_length,
      break_length: defaultSetting.break_length,
      isPlaying: false,
      isBreak: false,
      time_left: defaultSetting.session_length * 60,
    };
    this.renderMinSec = this.renderMinSec.bind(this);
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
  }

  renderMinSec(){
    let min = Math.floor(this.state.time_left / 60);
    let second = this.state.time_left % 60;
    second = Math.floor(second / 10)? second : '0' + second % 10;
    return `${min}:${second}`;
  }

  increment(){
    if(this.state.session_length < 60){
      this.setState({
        session_length: this.state.session_length + 1,
        time_left: this.state.time_left + 60
      });
    }

  }

  decrement(){
    if(this.state.session_length >= 0){
      this.setState({
        session_length: this.state.session_length - 1,
        time_left: this.state.time_left - 60
      });
    }
  }



  render(){
    return(
      <div>
        <h1>Pomodoro Clock</h1>
        <div className="container-settings">
          <SessionSetting session_length={this.state.session_length} pressIncrement={this.increment} pressDecrement={this.decrement}/>
          <BreakSetting break_length={this.state.break_length}/>
        </div>

        <div className="container-display">
          <TimerDisplay time_left={this.renderMinSec()}/>
        </div>

        <div className="container-control">
          <PlayControl isPlaying={this.state.isPlaying}/>
          <ResetControl />
        </div>
      </div>
    )
  }
}


ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA

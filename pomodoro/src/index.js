import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import arrow_upward from './img/arrow_upward.svg';
import arrow_downward from './img/arrow_downward.svg';
import play from './img/play.svg';
import reset from './img/reset.svg';
import stop from './img/stop.svg';


let intervalId;

const inital = {
  break_length: 5,
  session_length: 25
}

function Time_Left(props){
  let secs = props.time_left % 60;
  if (secs == 0){
    secs = secs + '0';
  }
  const mins = (props.time_left - secs) / 60;
  return(
    <div>
      <div id="timer_lable"></div>
      <div>{mins + ':' + secs}</div>
    </div>
  )
}

function Break_Length(props){
  return(
    <span>{props.break_length}</span>
  )
}

function Break_Increment(props){
  return(
    <img src={arrow_upward} alt="increment" onClick={props.onClick}/>
  )
}

function Break_Decrement(props){
  return(
    <img src={arrow_downward} alt="decrement" onClick={props.onClick} />
  )
}

function Session_Length(props){
  return(
    <span>{props.session_length}</span>
  )
}

function Session_Increment(props){
  return(
    <img src={arrow_upward} alt="increment" onClick={props.onClick} />
  )
}

function Session_Decrement(props){
  return(
    <img src={arrow_downward} alt="decrement" onClick={props.onClick} />
  )
}

function Start(props){
  return(
    <img src={play} alt="play" onClick={props.onClick} />
  )
}

function Stop(props){
  return(
    <img src={stop} alt="stop" onClick={props.onClick} />
  )
}

function Reset(props){
  return(
    <img src={reset} alt="reset" onClick={props.onClick} />
  )
}


class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      break_length: inital.break_length,
      session_length: inital.session_length,
      time_left: inital.session_length * 60,
      min_sec: inital.session_length + ':' + '00',
      isCountdown: false
    }
    this.sessionIncrement = this.sessionIncrement.bind(this);
    this.sessionDecrement = this.sessionDecrement.bind(this);
    this.breakIncrement = this.breakIncrement.bind(this);
    this.breakDecrement = this.breakDecrement.bind(this);
    this.resetCounter = this.resetCounter.bind(this);
    this.pressPlay = this.pressPlay.bind(this);
    this.countdown = this.countdown.bind(this);
    this.updateDisplayTime = this.updateDisplayTime.bind(this);
  }

  updateDisplayTime(){
    this.setState({min_sec: 'what happened!!!'});
  }

  sessionIncrement(){
    this.setState({
      session_length: this.state.session_length + 1,
      time_left: this.state.session_left
    });
  }

  sessionDecrement(){
    if(this.state.session_length >1){
      this.setState({
        session_length: this.state.session_length - 1,
        time_left: this.state.session_left
      });
    }
  }

  breakIncrement(){
    this.setState({break_length: this.state.break_length + 1});
  }

  breakDecrement(){
    if(this.state.break_length > 1){
      this.setState({break_length: this.state.break_length - 1});
    }
  }

  resetCounter(){
    this.setState({
      break_length: inital.break_length,
      session_length: inital.session_length,
      min_sec: inital.session_length + ':' + '00'
    });
  }

  pressPlay(){
    intervalId = setInterval(this.countdown, 1000);
  }

  countdown(){
   this.setState({time_left: this.state.time_left - 1});
   const secs = this.state.time_left % 60;
   const mins = (this.state.time_left - secs) / 60;
   this.setState({min_sec: mins + ':' + secs});

  }

  stopCountdown(){
    clearInterval(intervalId);
  }

  render(){
    return(
      <div className="container">
        <div id="setting">

          <div id="break_label">
            <Break_Decrement onClick = {this.breakDecrement} />
            <Break_Length break_length= {this.state.break_length} />
            <Break_Increment onClick = {this.breakIncrement} />
          </div>

          <div id="session_label">
            <Session_Decrement onClick= {this.sessionDecrement} />
            <Session_Length session_length= {this.state.session_length} />
            <Session_Increment onClick= {this.sessionIncrement} />
          </div>

        </div>

        <div id="display">
          <Time_Left time_left = {this.state.time_left} />
        </div>

        <div id="control">
          <Start onClick = {this.pressPlay} />
          <Stop onClick = {this.stopCountdown} />
          <Reset onClick = {this.resetCounter} />
        </div>

      </div>

    )
  }
}




ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA

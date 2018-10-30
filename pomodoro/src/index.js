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
      <i className="material-icons" onClick={props.pressIncrement}>add</i>
      <i className="material-icons" onClick={props.pressDecrement}>remove</i>
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
  return <i className="material-icons" onClick={props.onClick}>{props.isPause?"play_circle_outline":"stop"}</i>;
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
      isSession: true,
      isPause: true,
      time_left: defaultSetting.session_length * 60,
    };
    this.renderMinSec = this.renderMinSec.bind(this);
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
    this.countdown = this.countdown.bind(this);
    this.pause = this.pause.bind(this);
  }

  renderMinSec(){
    let min = Math.floor(this.state.time_left / 60);
    let second = this.state.time_left % 60;
    min = min < 10 ? '0'+ min : min;
    second = Math.floor(second / 10)? second : '0' + second % 10;
    return `${min}:${second}`;
  }

  increment(session_break){
    const time = session_break === 'session'? this.state.session_length:this.state.break_length;
    if(time < 60){
      this.setState({
        session_length: time + 1,
        time_left: this.state.time_left + 60
      });
    }

  }

  decrement(session_break){
    const time = session_break === 'session'? this.state.session_length:this.state.break_length;
    if(time >= 0){
      this.setState({
        session_length: time - 1,
        time_left: this.state.time_left - 60
      });
    }
  }


  countdown(){
    this.setState({isPause: false});
    let id = setInterval(timer.bind(this), 1000);
    function timer(){
      if(this.state.isPause){
        clearInterval(id);

      } else if(this.state.time_left === 0) {
        if(this.state.isSession){
          this.setState({
            time_left: this.state.break_length * 60,
            isSession: false
          });
        } else {
          this.setState({
            time_left: this.state.session_length * 60,
            isSession: true
            });
        }
      } else {
        this.setState({time_left: this.state.time_left - 1});
      }
    }
  }

  pause(){
    this.setState({isPause: true});
  }



  render(){
    return(
      <div>
        <h1>Pomodoro Clock</h1>
        <div className="container-settings">
          <SessionSetting session_length={this.state.session_length} pressIncrement={()=>this.increment('session')} pressDecrement={()=>this.decrement('session')}/>
          <BreakSetting break_length={this.state.break_length} pressIncrement={()=>this.increment('break')} pressDecrement={()=>this.decrement('break')} />
        </div>

        <div className="container-display">
          <TimerDisplay time_left={this.renderMinSec()}/>
        </div>

        <div className="container-control">
          <PlayControl isPause={this.state.isPause} onClick={this.state.isPause?this.countdown:this.pause}/>
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

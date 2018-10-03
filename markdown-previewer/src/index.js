import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import marked from 'marked';


class Markdown extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      userInput:'Markdown Previewer'
    };
    this.handleInput = this.handleInput.bind(this);
  }

  handleInput(e){
    this.setState({ userInput: e.target.value });
  }

  render(){

    return (
      <div>
      <input className = "editor" type ="text" onChange = {this.handleInput} value= {this.state.userInput}/>
      <p className = "previewer">{this.state.userInput}</p>
      <p></p>
      </div>
    )
  }
}

ReactDOM.render(<Markdown />, document.getElementById('root'));

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {RandomButton} from './RandomButton.js';
import {TweetButton} from './TweetButton.js';
import profile from './mucha_hamlet.jpg';

class RandomQuote extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      quote: "Be not afraid of greatness",
      author:"William Shakespeare",
      photo: profile
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleTweet = this.handleTweet.bind(this);
  }



  chooseQuote(){
    const quotes = [
      {quote: 'To be, or not to be: that is the question',
      author: 'Hamlet',
      photo: 'src'
      },

      {quote: 'Now is the winter of our discontent',
      author: 'Richard III',
      photo: 'src'
      },

      {quote: 'Is this a dagger which I see before me, the handle toward my hand?',
      author: 'Macbeth',
      photo: 'src'
      },

      {quote: 'How sharper than a serpent’s tooth it is to have a thankless child!',
      author: 'King Lear',
      photo: 'src'
      },

      {quote: 'I am one who loved not wisely but too well.',
      author: 'Othello',
      photo: 'src'
      }
    ]


    return quotes[Math.floor(Math.random()*quotes.length)];
  }

  handleTweet(){
    const encodeQuote = encodeURIComponent(this.state.quote);
    const url = "https://twitter.com/intent/tweet?text=" + encodeQuote;
    window.open(url);
  }

  handleClick(){
    const newQuote = this.chooseQuote();
    this.setState({
      quote: newQuote.quote,
      author: newQuote.author,
      })
  }

  render(){
    return (
      <div className="container">
        <img className="avatar" src= {this.state.photo} alt="" />
        <p className="author">{this.state.author}</p>
        <p className="quote">{this.state.quote}</p>

        <TweetButton onClick = {this.handleTweet}/ >
        <RandomButton onClick = {this.handleClick} />
      </div>
    );
  }
}

ReactDOM.render(<RandomQuote />, document.getElementById('root'));

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {RandomButton} from './RandomButton.js';
import {TweetButton} from './TweetButton.js';
import hamlet from './mucha_hamlet.jpg';
import richard3 from './richardthird.jpg';
import othello from './othello.jpg';
import macbeth from './macbeth.jpg';
import kinglear from './kinglear.jpg';
import bgImage from './Shakespeare.jpg';

const bgImageStyle = {
  position: 'fixed',
  width: '100%',
  height: '100vh',
  backgroundImage: `url(${bgImage})`,
  backgroundPosition: 'center',
  backgroundImageRepeat: 'no-repeat',
  backgroundSize: 'cover',
  // outline: '1px solid blue'

}

class RandomQuote extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      quote: "Be not afraid of greatness",
      author:"William Shakespeare",
      photo: hamlet
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleTweet = this.handleTweet.bind(this);
  }


  chooseQuote(){
    const quotes = [
      {quote: 'To be, or not to be: that is the question',
      author: 'Hamlet',
      photo: hamlet
      },

      {quote: 'Now is the winter of our discontent',
      author: 'Richard III',
      photo: richard3
      },

      {quote: 'Is this a dagger which I see before me, the handle toward my hand?',
      author: 'Macbeth',
      photo: macbeth
      },

      {quote: 'How sharper than a serpent’s tooth it is to have a thankless child!',
      author: 'King Lear',
      photo: kinglear
      },

      {quote: 'I am one who loved not wisely but too well.',
      author: 'Othello',
      photo: othello
      }
    ]


    return quotes[Math.floor(Math.random()*quotes.length)].author === this.state.author? this.chooseQuote(): quotes[Math.floor(Math.random()*quotes.length)];
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
      photo: newQuote.photo
      })
  }

  render(){
    return (
      <div id="container" style = {bgImageStyle}>
        <div id="quote-box">
          <div className="image-cropper">
            <img className="avatar" src= {this.state.photo} alt="" />
          </div>
          <p className="author">{this.state.author}</p>
          <p className="quote">{this.state.quote}</p>

          <TweetButton onClick = {this.handleTweet}/ >
          <RandomButton onClick = {this.handleClick} />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<RandomQuote />, document.getElementById('root'));

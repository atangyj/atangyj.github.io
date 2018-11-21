import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import drumMachine from './img/drumMachine.png';
import localWeather from './img/localWeather.png';
import pomodoro from './img/pomodoro.png';
import randomQuote from './img/randomQuote.png';
import twitch from './img/twitch.png';
import wikipedia from './img/wikipedia.png';



const projects = [
   {
    name: "The Path to the world",
    src: wikipedia,
    intro:"I go to workout studio every weekdays. Then I build a workout pomodoro for myself",
    skill: ["Javascript ES6","Wikipedia API"]
  },

   {
    name: "Shakespear's twitter",
    src: randomQuote,
    intro: "I go to workout studio every weekdays. Then I build a workout pomodoro for myself",
    skill: ["React", "Twitter API"]
  },

 {
    name: "Drum Machine",
    src: drumMachine,
    intro:"I go to workout studio every weekdays. Then I build a workout pomodoro for myself",
    skill: ["React"]
  },

   {
    name: "Twitch",
    src: twitch,
    intro:"I go to workout studio every weekdays. Then I build a workout pomodoro for myself",
    skill: ["Javascript ES6", "Twitch API"]
  },

   {
    name: "Lodoner's daily topic",
    src: localWeather,
    intro:"I go to workout studio every weekdays. Then I build a workout pomodoro for myself",
    skill: ["Javascript ES6", "Weather API"]
  },

   {
    name: "Fitness timer",
    src: pomodoro,
    intro:"I go to workout studio every weekdays. Then I build a workout pomodoro for myself",
    skill: ["React"]
  }
];

// class Skill extends React.Component {
//   const skill =
//   render(){
//
//     return(
//
//     )
//   }
// }

class Project extends React.Component {
  render(){
    const skills = this.props.skill;
    const skill_list = skills.map(skill=> <span>{skill}<span className="ws">|</span></span>)
    return(
      <div className="container-list-project">
        <img className="project-screenshot" src={this.props.src} />
        <div className="container-project-desc">
          <div className="top">
            <h1>{this.props.name}</h1>
            <div>{skill_list}</div>
          </div>

          <div className="bottom">
            <p>{this.props.intro}</p>
            <a>visit website</a>
          </div>
        </div>
      </div>
    )
  }
}


class Portfolio extends React.Component {
  constructor(props){
    super(props);
    this.renderProject = this.renderProject.bind(this);
    this.clickNav = this.clickNav.bind(this);

  }

  renderProject(i){
    return (
      <Project name = {projects[i].name} src={projects[i].src} intro={projects[i].intro} skill={projects[i].skill}/>
    )
  }


  clickNav(e){
      const name = e.target.classList.value;
      const ele = document.querySelector(".container-"+name);

      ele.scrollIntoView();
      ele.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }

  render(){
    return(
      <div className="container">
        <header>
          <h1 className="header-title">Hi, I'm Alice.</h1>
          <p>I'm London-based web developer and bring easy-to-use interface to the daily life by Javascript and React. I'd managed and designed a phone number indentification App at <a target="_blank" href="https://whoscall.com/en-US/">Gogolook</a>. I'd researched decision-making behavior at <a target="_blank" href="http://gibms.mc.ntu.edu.tw/Eng/">Brain & Mind Lab</a>. Welcome to look at some of my projects.</p>
          <nav className="clear">
            <ul>
              <li className="projects" onClick={this.clickNav}>Project</li>
              <li><a className="link-resume" href="*">Resume</a></li>
              <li className="contact" onClick={this.clickNav}>Contact</li>
            </ul>
          </nav>

        </header>


        <div className="container-projects">
            {this.renderProject(0)}
            {this.renderProject(1)}
            {this.renderProject(2)}
            {this.renderProject(3)}
            {this.renderProject(4)}
            {this.renderProject(5)}
        </div>
        <div className="container-contact">
          <h1>Welcom to say hi to me at <a href="mailto:atangyj@gmail.com">atangyj@gmail.com</a></h1>
          <h1>Find me on <a href="www.linkedin.com/in/aliceYJ">LinkedIn</a></h1>
          <h1>View my code on <a href="https://github.com/atangyj">github</a></h1>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<Portfolio />, document.getElementById('root'));

window.onscroll = function(){fixHeader()};

const nav = document.querySelector('nav');
const sticky = nav.offsetTop;

function fixHeader(){
  if (window.pageYOffset > sticky) {
    nav.classList.add("sticky");
  } else {
    nav.classList.remove("sticky");
  }
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

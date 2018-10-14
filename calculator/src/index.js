import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';




function NumberBtn(props){
  return <div onClick = {props.onClick}>{props.num}</div>;
}

function DecimalBtn(props){
  return <div onClick = {props.onClick}>.</div>
}

function ClearBtn(props){
  return <div onClick={props.onClick}>AC</div>;
}

function OperatorBtn(props){
  return <div onClick = {props.onClick}>{props.operator}</div>
}

function EqualBtn(props){
  return <div onClick = {props.onClick}>=</div>
}

function Display(props){
  return <div>{props.display}</div>
}


class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      display: "0"
    };
    this.pressNum = this.pressNum.bind(this);
    this.pressOperator = this.pressOperator.bind(this);
    this.calculator = this.calculator.bind(this);
    this.clearDisplay = this.clearDisplay.bind(this);
    this.pressDecimal = this.pressDecimal.bind(this);
  }

  pressNum(num){

        const isZero = this.state.display === "0";

        if(isZero){
          this.setState({display: num.toString()})
        } else if(/(x|\/|\+|-)0$/.test(this.state.display)) {
          this.setState({display: this.state.display.slice(0, -1) + num});
        } else {
          this.setState({display: this.state.display + num});
        }


  }

  pressOperator(opr){


        if(/(\+|-|X|\/)$/.test(this.state.display)){
          this.setState({display: this.state.display.slice(0, -1) + opr});
        } else if (this.state.display!==""){
          this.setState({display: this.state.display + opr});
        }


  }

  pressDecimal(){

      const isOpr = /\+|-|X|\/\./.test(this.state.display[this.state.display.length-1]);
      if(!isOpr){
        this.setState({
          display: this.state.display + '.'
        })
      }


  }

  calculator(){


        const formulaPatt = /[0-9]+(\.)?[0-9]*X[0-9]+(\.)?[0-9]*|[0-9]+(\.)?[0-9]*\/[0-9]+(\.)?[0-9]*/;
        const oprPattern = /X|\//;
        let str = this.state.display;
        let isMatched = formulaPatt.test(str);

        while(isMatched){
          let matchedFormula = str.match(formulaPatt)[0];
          let matchedOpr = matchedFormula.match(oprPattern)[0];
          let nums = matchedFormula.split(oprPattern);
          let num1 = parseFloat(nums[0]); console.log('num1:'+num1);
          let num2 = parseFloat(nums[1]); console.log('num2:'+num2);
          console.log(matchedFormula);
          str = str.replace(formulaPatt,function(){
            if (matchedOpr ==='X'){
              return num1 * num2;
            }
            return num1 / num2;
          })
          isMatched = formulaPatt.test(str);

        }
        const add_minus_formula = /[0-9]+(\.)?[0-9]*\+[0-9]+(\.)?[0-9]*|[0-9]+(\.)?[0-9]*-[0-9]+(\.)?[0-9]*/;
        const add_minus_opr = /\+|-/;
        let keepCalc = add_minus_formula.test(str);

        while(keepCalc){
          let matchedFormula = str.match(add_minus_formula)[0]; console.log(matchedFormula);
          let matchedOpr = matchedFormula.match(add_minus_opr)[0];console.log(matchedOpr);
          let nums = matchedFormula.split(add_minus_opr); console.log(nums);
          let num1 = parseFloat(nums[0]);
          let num2 = parseFloat(nums[1]);

          str = str.replace(add_minus_formula, function(){
            if(matchedOpr==='-'){
              return num1 - num2;
            }
              return num1 + num2;
          })
          keepCalc = add_minus_formula.test(str);
        }

        console.log('str:'+str);


        if (/\+|-|X|\/$/.test(str)) {
          this.setState({display: this.state.display + '=' + str.slice(0,-1)});
        } else {
          this.setState({
            display: this.state.display + '='+ str
          });
        }

        this.setState({haveResult: true});


  }

  clearDisplay(){
    this.setState({display: "0"});
  }

  render(){
    const nums = [0,1,2,3,4,5,6,7,8,9].map((num)=>
      <NumberBtn key={num} num={num} onClick={()=> this.pressNum(num)}/>
    );

    return(
      <div>
        <Display display={this.state.display}/>

        <div className='left'>
          <ClearBtn onClick = {this.clearDisplay}/>
          <div className="nums">
            {nums}
          </div>
          <DecimalBtn onClick = {this.pressDecimal}/>
        </div>

        <div className='right'>
          <OperatorBtn operator="/" onClick = {()=>this.pressOperator('/')}/>
          <OperatorBtn operator="X" onClick = {()=>this.pressOperator('X')}/>
          <OperatorBtn operator="-" onClick = {()=>this.pressOperator('-')}/>
          <OperatorBtn operator="+" onClick = {()=>this.pressOperator('+')}/>

          <EqualBtn onClick = {this.calculator}/>
        </div>




      </div>
    )
  }
}


ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA

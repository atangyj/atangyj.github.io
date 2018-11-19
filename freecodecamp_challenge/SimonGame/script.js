
const stepNum_display = document.querySelector(".display h2");
const start_btn = document.querySelector(".start .btn");
const strict_btn = document.querySelector(".strict .btn");
const switch_btn = document.querySelector("input[type='checkbox']");


let model= {
  isStart: false,
  isStrict: false,
  stepNum: 1,
  steps: [],
  preColor: null,
  colors: {green:"#E0F3D6" , blue: "#A6B7EA" , red:"#FCE9E6" ,yellow:"#FAF7BC"},
  randomColor:function(){
    const colors = Object.keys(this.colors);
    const color = colors[Math.floor(Math.random()*3)];
    this.steps.push(color);
    return color;
  }

};

let view = {
  displayGameStart: function(){
    stepNum_display.style.animationPlayState = "running";
  },

  displayStepNumber: function(){
    stepNum_display.innerHTML = model.stepNum;
    stepNum_display.style.color = "red";
  },
  displaySteps: function(){
    this.countDown = model.stepNum;
    this.id = setInterval(this.changeStep.bind(this), 1000);
    this.stepNum++;

  },

  displayGame: function(){
    this.displayStepNumber();
    this.displaySteps();
  },

  removePreStep: function(){
    if(model.preColor!==null){
      document.getElementById(model.preColor).style.background = model.preColor;
    }
  },
  changeStep: function(){
    if(this.countDown<=0){
      clearInterval(this.id);
    } else {
      setTimeout(this.removePreStep, 500)
      const color = model.randomColor();
      const color_of_step = model.colors[color];
      const ele_of_color = document.getElementById(color);
      model.preColor = color;
      ele_of_color.style.background  = color_of_step;
      this.countDown--;
    }
  },

  displayUserInput: function(e){
    const color = e.target.id;
    const userInput = e.target;
    userInput.style.background = model.colors[color];
    setTimeout(function(){userInput.style.background = color},300);
    controller.checkInput(userInput);
  },


};


let controller = {
  switchMode: function(){
    model.isStart = switch_btn.checked;
    if(model.isStart){
      view.displayGameStart();
    } else {

    }
  },

  checkInput: function(userInput){
    const inputColor = userInput.id;
    const trialColor = model.steps[0];
    const isCorrect = inputColor==trialColor);
    
  }
}

switch_btn.onclick = controller.switchMode;
stepNum_display.addEventListener("animationend", view.displayGame.bind(view));
const buttons = document.getElementsByClassName("button");
for(let i=0; i < buttons.length; i++){
  buttons[i].onclick = view.displayUserInput;
}

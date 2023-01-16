const refs = {    
    btnStart: document.querySelector("button[data-start]"),
    btnStop: document.querySelector("button[data-stop]"),
    body: document.querySelector("body"),
  };

refs.btnStart.addEventListener('click', start);
refs.btnStop.addEventListener('click',stop)
let  intervalId = null;
function start(){
    refs.btnStart.disabled = true;
  intervalId = setInterval(() =>{
       const randomColor = getRandomHexColor()
       refs.body.style.backgroundColor = randomColor;
       
    },1000)
}
function stop(){
clearInterval(intervalId)
refs.btnStart.disabled = false;
}

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }
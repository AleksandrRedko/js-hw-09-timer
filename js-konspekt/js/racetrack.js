const horses = [
  'Secretariat',
  'Eclipse',
  'West Australian',
  'Flying Fox',
  'Seabiscuit',
  
];

const refs = {
  startBtn: document.querySelector('.js-start-race'),
  winnerField: document.querySelector('.js-winner'),
  progressField: document.querySelector('.js-progress'),
  tableBody: document.querySelector('.js-results-table > tbody'),
};
let raceCounter = 0;
refs.startBtn.addEventListener('click' , onStart)

function onStart() {
  const promises = horses.map(run);

  updateWinnerField('');
  determineWinner(promises)
  waitForAll(promises)
  
    updateProgressField(' Заезд начался,ставки не принимаються!') ; 
}

function waitForAll(horsesP) {
  Promise.all(horsesP).then(() => {
    updateProgressField('Заезд окончен,принимаются ставки');
    })

}

function determineWinner(horseP) {
  Promise.race(horseP).then(({horse, time,}) => {
    raceCounter += 1;
    updateWinnerField(` Победил ${horse} ,финишироваз за ${time}  времени`);
    updateResultWinner({horse, time,raceCounter})
  })
  
}
function updateWinnerField(message){
  refs.winnerField.textContent = message
}
function updateProgressField(message){
  refs.progressField.textContent = message
}

function updateResultWinner({horse, time,raceCounter}){
const tr = `<tr><td>${raceCounter}</td><td>${horse}</td><td>${time}</td></tr>`;
refs.tableBody.insertAdjacentHTML('beforeend',tr)
}


function run(horse) {
return new Promise((resolve) =>{
  const time =  getRandomTime(2000, 3500);
   setTimeout(() =>{
    resolve({horse, time})
   },time);

})
}



function getRandomTime(min,max){
  return Math.floor(Math.random() * (max - min + 1) + min)
  }


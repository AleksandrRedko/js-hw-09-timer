const refs = {
  clockface: document.querySelector(".js-clockface"),
  btnStart: document.querySelector(".timer-btn[data-action-start]"),
  btnStop: document.querySelector(".timer-btn[data-action-stop]"),
};
class Timer {
  constructor({onTick}) {
    this.intervalId = null;
    this.isActive = false;
    this.onTick = onTick;

    this.init();
  }
  init() {
    const time = this.getTimeComponents(0);
    this.onTick(time);
  }

  start() {
    if (this.isActive) {
      return;
    }
    const startTime = Date.now();
    
    this.isActive = true;

    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = currentTime - startTime;
      const time = this.getTimeComponents(deltaTime);
      this.onTick(time);
    }, 1000);
  }
  stop() {
    clearInterval(this.intervalId);
    this.isActive = false;
    const time = this.getTimeComponents(0);
    this.onTick(time);
  }

  getTimeComponents(time) {
    const hours = this.pad(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    );
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

    return {hours, mins, secs};
  }
  pad(value) {
    return String(value).padStart(2, "0");
  }
}

const timer = new Timer({
  onTick: updateClockface,
});

refs.btnStart.addEventListener("click", timer.start.bind(timer));
refs.btnStop.addEventListener("click", timer.stop.bind(timer));

// const timer = {
//   intervalId: null,
//   isActive: false,
//   start() {
//     if (this.isActive) {
//       return;
//     }
//     const startTime = Date.now();
//     this.isActive = true;

//     this.intervalId = setInterval(() => {
//       const currentTime = Date.now();
//       const deltaTime = currentTime - startTime;
//       const time = getTimeComponents(deltaTime);
//       updateClockface(time);
//     }, 1000);
//   },

//   stop() {
//     clearInterval(this.intervalId);
//     this.isActive = false;
//   },
// };
// refs.btnStart.addEventListener("click", () => {
//   timer.start();
// });
// refs.btnStop.addEventListener("click", () => {
//   timer.stop();
// });
// /*
//  * - Принимает время в миллисекундах
//  * - Высчитывает сколько в них вмещается часов/минут/секунд
//  * - Возвращает обьект со свойствами hours, mins, secs
//  * - Адская копипаста со стека 💩
//  */
// function getTimeComponents(time) {
//   const hours = pad(
//     Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
//   );
//   const mins = pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
//   const secs = pad(Math.floor((time % (1000 * 60)) / 1000));

//   return {hours, mins, secs};
// }

// /*
//  * Принимает число, приводит к строке и добавляет в начало 0 если число меньше 2-х знаков
//  */
// function pad(value) {
//   return String(value).padStart(2, "0");
// }
function updateClockface({hours, mins, secs}) {
  refs.clockface.textContent = `${hours}:${mins}:${secs}`;
}

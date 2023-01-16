import flatpickr from "flatpickr";
import {Notify} from "notiflix/build/notiflix-notify-aio";
const refs = {
  input: document.querySelector("#datetime-picker"),
  btnStart: document.querySelector("button[data-start]"),
  Days: document.querySelector(".value[data-days]"),
  Hours: document.querySelector(".value[data-hours]"),
  Minutes: document.querySelector(".value[data-minutes]"),
  Seconds: document.querySelector(".value[data-seconds]"),
};

let selectedDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    if (selectedDates[0] > new Date()) {
      selectedDate = selectedDates[0];
      refs.btnStart.disabled = false;
    }
    if (selectedDates[0] <= new Date()) {
      selectedDates[0] = new Date();

      Notify.failure("Please choose a date in the future");
    }
  },
};

flatpickr("#datetime-picker", options);

function updateClockface({days, hours, minutes, seconds}) {
  refs.Days.textContent = `${days}`;
  refs.Hours.textContent = `${hours}`;
  refs.Minutes.textContent = `${minutes}`;
  refs.Seconds.textContent = `${seconds}`;
}

class Timer {
  constructor({onTick}) {
    this.onTick = onTick;
    this.intervalId = null;
    this.ms = 0;
  }
  convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = this.addLeadingZero(Math.floor(ms / day));
    // Remaining hours
    const hours = this.addLeadingZero(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = this.addLeadingZero(
      Math.floor(((ms % day) % hour) / minute)
    );
    // Remaining seconds
    const seconds = this.addLeadingZero(
      Math.floor((((ms % day) % hour) % minute) / second)
    );

    return {days, hours, minutes, seconds};
  }
  timeDifference() {
    refs.btnStart.disabled = true;
    const intervalId = setInterval(() => {
      this.ms = Date.parse(selectedDate) - Date.parse(new Date());
      if (this.ms === 0) {
        clearInterval(intervalId);
      }
      const time = this.convertMs(this.ms);

      updateClockface(time);
    }, 1000);
  }
  addLeadingZero(value) {
    return String(value).padStart(2, "0");
  }
}

const timer = new Timer({
  onTick: updateClockface,
});

refs.btnStart.disabled = true;
refs.btnStart.addEventListener("click", timer.timeDifference.bind(timer));

// let selectedDate = null;
// const options = {
//   enableTime: true,
//   time_24hr: true,
//   defaultDate: new Date(),
//   minuteIncrement: 1,

//   onClose(selectedDates) {
//     if (selectedDates[0] > new Date()) {
//       selectedDate = selectedDates[0];
//       refs.btnStart.disabled = false;
//     }
//     if (selectedDates[0] <= new Date()) {
//       selectedDates[0] = new Date();
//       window.alert("Please choose a date in the future");
//     }
//   },
// };
// flatpickr("#datetime-picker", options);

// let ms = 0;
// function convertMs(ms) {
//   // Number of milliseconds per unit of time
//   const second = 1000;
//   const minute = second * 60;
//   const hour = minute * 60;
//   const day = hour * 24;

//   // Remaining days
//   const days = addLeadingZero(Math.floor(ms / day));
//   // Remaining hours
//   const hours = addLeadingZero(Math.floor((ms % day) / hour));
//   // Remaining minutes
//   const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
//   // Remaining seconds
//   const seconds = addLeadingZero(
//     Math.floor((((ms % day) % hour) % minute) / second)
//   );

//   return {days, hours, minutes, seconds};
// }
// function timeDifference() {
//   refs.btnStart.disabled = true;
//   const intervalId = setInterval(() => {
//     ms = Date.parse(selectedDate) - Date.parse(new Date());
//     if (ms === 0) {
//       clearInterval(intervalId);
//     }
//     const time = convertMs(ms);

//     updateClockface(time);
//   }, 1000);
// }
// function addLeadingZero(value) {
//   return String(value).padStart(2, "0");
// }

// function updateClockface({days, hours, minutes, seconds}) {
//   refs.Days.textContent = `${days}`;
//   refs.Hours.textContent = `${hours}`;
//   refs.Minutes.textContent = `${minutes}`;
//   refs.Seconds.textContent = `${seconds}`;
// }

import flatpickr from "flatpickr";
import {Notify} from "notiflix/build/notiflix-notify-aio";
const refs = {
  input: document.querySelector("#datetime-picker"),
  btnStart: document.querySelector("button[data-start]"),
  Days: document.querySelector(".value[data-days]"),
  Hours: document.querySelector(".value[data-hours]"),
  Minutes: document.querySelector(".value[data-minutes]"),
  Seconds: document.querySelector(".value[data-seconds]"),
  fieldMinutes: document.querySelector(".js-minutes"),
  fieldHours: document.querySelector(".js-hours"),
  fieldDays: document.querySelector(".js-days"),
  fieldSeconds: document.querySelector(".js-seconds"),
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
      refs.btnStart.textContent = "Старт";
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

function updateBackgroundEffect({d, h, m, s}) {
  refs.fieldDays.style.background = `conic-gradient(#02c2c2 0 ${d}%, #303238 ${d}% 100%)`;
  refs.fieldHours.style.background = `conic-gradient(#02c2c2 0 ${h}%, #303238 ${h}% 100%)`;
  refs.fieldMinutes.style.background = `conic-gradient(#02c2c2 0 ${m}%, #303238 ${m}% 100%)`;
  refs.fieldSeconds.style.background = `conic-gradient(#02c2c2 0 ${s}%, #303238 ${s}% 100%)`;
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
  updateProcent({days, hours, minutes, seconds}) {
    let s = 100 - (100 / 60) * seconds;
    if (seconds === 0) {
      s = 0;
    }
    let m = 100 - (100 / 60) * minutes;
    if (minutes === 0) {
      m = 0;
    }
    let h = 100 - (100 / 24) * hours;
    if (hours === 0) {
      h = 0;
    }
    let d = 100 / days;
    if (days === 0) {
      d = 0;
    }
    return {d, h, m, s};
    // refs.field.style.background = `conic-gradient(#02c2c2 0 ${s}%, #303238 ${s}% 100%)`;
  }
  timeDifference() {
    refs.btnStart.disabled = true;
    const intervalId = setInterval(() => {
      this.ms = Date.parse(selectedDate) - Date.parse(new Date());
      if (this.ms === 0) {
        clearInterval(intervalId);
      }
      const time = this.convertMs(this.ms);
      const procent = this.updateProcent(time);

      updateClockface(time);
      this.updateProcent(time);
      updateBackgroundEffect(procent);
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

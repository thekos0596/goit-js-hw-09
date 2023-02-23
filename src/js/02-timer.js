import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
require('flatpickr/dist/themes/dark.css');
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  input: document.querySelector('#datetime-picker'),
  startTimerBtn: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};
let timerId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    console.log(new Date());

    if (selectedDates[0] < new Date()) {
      refs.startTimerBtn.disabled = true;
      Notify.failure('Please choose a date in the future', {
        width: '350px',
        clickToClose: true,
      });
    } else {
      refs.startTimerBtn.disabled = false;
      refs.startTimerBtn.addEventListener('click', () => {
        changeTimerValue(selectedDates[0]);
      });
    }
  },
};
flatpickr(refs.input, options);

function changeTimerValue() {
  timerId = setInterval(() => {
    let currentTime = new Date(refs.input.value) - new Date();
    refs.startTimerBtn.disabled = true;
    console.log(currentTime);
    if (currentTime >= 0) {
      let timerData = convertMs(currentTime);
      refs.days.textContent = timerData.days;
      refs.hours.textContent = timerData.hours;
      refs.minutes.textContent = timerData.minutes;
      refs.seconds.textContent = timerData.seconds;
    } else {
      clearInterval(timerId);
    }
  }, 1000);
}

function pad(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = pad(Math.floor(ms / day));
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

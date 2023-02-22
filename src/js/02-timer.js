import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

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
      window.alert('Please choose a date in the future');
    } else {
      refs.startTimerBtn.disabled = false;
      refs.startTimerBtn.addEventListener('click', () => {
        changeTimerValue(selectedDates[0]);
      });
    }
  },
};
flatpickr(refs.input, options);

function changeTimerValue(selectedDates) {
  let timer = setInterval(() => {
    let countdown = new Date(refs.input.value) - new Date();
    refs.startTimerBtn.disabled = true;
    refs.input.disabled = true;
    console.log(countdown);
    if (countdown >= 0) {
      let timerData = convertMs(countdown);
      refs.days.textContent = timerData.days;
      refs.hours.textContent = timerData.hours;
      refs.minutes.textContent = timerData.minutes;
      refs.seconds.textContent = timerData.seconds;
    } else {
      clearInterval(timer);
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
  const days = pad(Math.floor(ms / day) * -1);
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour) * -1);
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute) * -1);
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second) * -1);

  return { days, hours, minutes, seconds };
}

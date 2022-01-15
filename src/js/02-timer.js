import flatpickr from "flatpickr";
import 'flatpickr/dist/flatpickr.min.css';

const input = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');

startBtn.disabled = true;

let dateToChoose = null;
let intervalId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if((selectedDates[0] - options.defaultDate) < 0){
      startBtn.disabled = true;
        alert("Please choose a date in the future")  
        return
    };
      
    startBtn.disabled = false;
    dateToChoose = selectedDates[0];
      
  },
};

flatpickr(input, options);

startBtn.addEventListener('click', onStartBtnClick);

function onStartBtnClick() {
intervalId = setInterval(() => {
    const dateNow = new Date();
    const timeDifference = dateToChoose.getTime() - dateNow.getTime();
    const convertTime = convertMs(timeDifference);
    updateTime(convertTime);
    
}, 1000);

}
function updateTime (obj) {
    days.textContent = addLeadingZero(obj.days);
    hours.textContent = addLeadingZero(obj.hours);
    minutes.textContent = addLeadingZero(obj.minutes);
    seconds.textContent = addLeadingZero(obj.seconds);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    return String(value).padStart(2, '0')
}



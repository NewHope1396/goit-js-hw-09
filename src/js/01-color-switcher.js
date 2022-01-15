function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const body = document.querySelector('body');

stopBtn.disabled = true;

let intervalId = null;

startBtn.addEventListener('click', onStartClick);
stopBtn.addEventListener('click', onStopClick);

function onStartClick() {
    intervalId = setInterval(changeBodyColor, 1000);
    startBtn.disabled = true;
    stopBtn.disabled = false;
}

function changeBodyColor () {
    body.style.backgroundColor = getRandomHexColor()
}

function onStopClick() {
    clearInterval(intervalId);
    startBtn.disabled = false;
    stopBtn.disabled = true;
}


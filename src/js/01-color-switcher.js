const refs = {
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
};
let intervalId = null;

refs.startBtn.addEventListener('click', changeColor);
refs.stopBtn.addEventListener('click', stopChangeColor);

function changeColor() {
  intervalId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  refs.startBtn.disabled = true;
}

function stopChangeColor() {
  clearInterval(intervalId);
  refs.startBtn.disabled = false;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

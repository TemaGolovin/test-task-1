const inputEl = document.querySelector('input');
const buttonEl = document.querySelector('button');
const timerEl = document.querySelector('span');

const state = {
  timerTime: '',
  isSetInterval: false,
};

// Напишите реализацию createTimerAnimator
// который будет анимировать timerEl
const createTimerAnimator = (seconds) => {
  return () => {
    let hours = Math.floor(seconds / 3600);
    const secondsWithoutHours = seconds % 3600;
    let minutes = Math.floor(secondsWithoutHours / 60);
    let secondsResult = secondsWithoutHours % 60;

    hours = hours < 10 ? `0${hours}` : hours;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    secondsResult = secondsResult < 10 ? `0${secondsResult}` : secondsResult;

    timerEl.textContent = `${hours}:${minutes}:${secondsResult}`;

    seconds -= 1;
  };
};

inputEl.addEventListener('input', (event) => {
  const { value } = event.target;
  const chars = value.split('');
  const lastChar = chars[chars.length - 1];
  if (!isNaN(Number(lastChar)) && chars.length > state.timerTime.length) {
    state.timerTime += lastChar;
  }
  if (chars.length < state.timerTime.length) {
    state.timerTime = state.timerTime.slice(0, -1);
  }
  event.target.value = state.timerTime;

  // Очистите input так, чтобы в значении
  // оставались только числа
});

buttonEl.addEventListener('click', () => {
  if (state.isSetInterval) {
    return;
  }
  const seconds = Number(state.timerTime);
  const animateTimer = createTimerAnimator(seconds);
  animateTimer();
  let intervalId = setInterval(animateTimer, 1000);
  state.isSetInterval = true;
  setTimeout(() => {
    state.isSetInterval = false;
    clearInterval(intervalId);
  }, seconds * 1000);

  inputEl.value = '';
  state.timerTime = '';
});

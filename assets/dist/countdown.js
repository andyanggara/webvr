const FULL_DASH_ARRAY = 283;

const COLOR_CODES = {
    color: 'gray',
};

const TIME_LIMIT = 5;
let timePassed = 0;
let timeLeft = TIME_LIMIT;
let timerInterval = null;
let remainingPathColor = COLOR_CODES.color;

document.getElementById('countText').innerHTML = 'Halaman akan pindah otomatis dalam';
document.getElementById('countdown2').innerHTML = `
<div class="base-timer">
  <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <g class="base-timer__circle">
      <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
      <path
        id="base-timer-path-remaining"
        stroke-dasharray="283"
        class="base-timer__path-remaining ${remainingPathColor}"
        d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
      ></path>
    </g>
  </svg>
  <span id="base-timer-label" class="base-timer__label">${formatTime(timeLeft)}</span>
</div>
`;

// startTimer();

function onTimesUp() {
    clearInterval(timerInterval);
}

function startTimer(link) {
    timerInterval = setInterval(() => {
        timePassed = timePassed += 1;
        timeLeft = TIME_LIMIT - timePassed;
        document.getElementById('base-timer-label').innerHTML = formatTime(timeLeft);
        console.log('pindah halaman dalam ' + timeLeft);
        setCircleDasharray();

        if (timeLeft === 0) {
            window.location.href = link;
            onTimesUp();
        }
    }, 1000);
}

function formatTime(time) {
    let seconds = time % 60;

    if (seconds < 10) {
        seconds = `${seconds}`;
    }

    return `${seconds}`;
}

function calculateTimeFraction() {
    const rawTimeFraction = timeLeft / TIME_LIMIT;
    return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
}

function setCircleDasharray() {
    const circleDasharray = `${(calculateTimeFraction() * FULL_DASH_ARRAY).toFixed(0)} 283`;
    document.getElementById('base-timer-path-remaining').setAttribute('stroke-dasharray', circleDasharray);
}

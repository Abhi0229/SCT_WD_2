let startTime, updatedTime, difference;
let timerInterval;
let running = false;
let lapCount = 0;

const display = document.getElementById("display");
const laps = document.getElementById("laps");

document.getElementById("start").onclick = start;
document.getElementById("pause").onclick = pause;
document.getElementById("reset").onclick = reset;
document.getElementById("lap").onclick = lap;

function start() {
  if (!running) {
    startTime = new Date().getTime() - (difference || 0);
    timerInterval = setInterval(updateTime, 10);
    running = true;
  }
}

function pause() {
  clearInterval(timerInterval);
  running = false;
}

function reset() {
  clearInterval(timerInterval);
  running = false;
  difference = 0;
  lapCount = 0;
  display.innerText = "00:00:00";
  laps.innerHTML = "";
}

function lap() {
  if (!running) return;
  lapCount++;
  const li = document.createElement("li");
  li.innerText = `Lap ${lapCount}: ${display.innerText}`;
  laps.appendChild(li);
}

function updateTime() {
  updatedTime = new Date().getTime();
  difference = updatedTime - startTime;

  let minutes = Math.floor((difference / (1000 * 60)) % 60);
  let seconds = Math.floor((difference / 1000) % 60);
  let milliseconds = Math.floor((difference % 1000) / 10);

  display.innerText =
    `${pad(minutes)}:${pad(seconds)}:${pad(milliseconds)}`;
}

function pad(num) {
  return num < 10 ? "0" + num : num;
}

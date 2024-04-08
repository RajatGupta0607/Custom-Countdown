const inputConatiner = document.querySelector("#input-container");
const countdownForm = document.querySelector("#countdownForm");
const dateEl = document.querySelector("#date-picker");
const countdownEl = document.querySelector("#countdown");
const countdownElTitle = document.querySelector("#countdown-title");
const countdownBtn = document.querySelector("#countdown-button");
const timeElements = document.querySelectorAll("span");
const completeEl = document.querySelector("#complete");
const completeElInfo = document.querySelector("#complete-info");
const completeBtn = document.querySelector("#complete-button");
let countTitle = "";
let countdownDate = "";
let countdownValue = Date;
let countdownActive;
let savedCountdown;
const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

// Set date to minimum value for latest day
const today = new Date().toISOString().split("T")[0];
dateEl.min = today;

function updateDOM() {
  countdownActive = setInterval(() => {
    const now = new Date().getTime();
    const distance = countdownValue - now;
    const days = Math.floor(distance / day);
    const hours = Math.floor((distance % day) / hour);
    const minutes = Math.floor((distance % hour) / minute);
    const seconds = Math.floor((distance % minute) / second);

    inputConatiner.hidden = true;

    if (distance < 0) {
      countdownEl.hidden = true;
      clearInterval(countdownActive);
      completeElInfo.textContent = `${countTitle} has finished on ${countdownDate}`;
      completeEl.hidden = false;
    } else {
      countdownElTitle.textContent = `${countTitle}`;
      timeElements[0].textContent = `${days}`;
      timeElements[1].textContent = `${hours}`;
      timeElements[2].textContent = `${minutes}`;
      timeElements[3].textContent = `${seconds}`;
      completeEl.hidden = true;
      countdownEl.hidden = false;
    }
  }, second);
}

// Reset Values
function resetValues() {
  countdownEl.hidden = true;
  completeEl.hidden = true;
  inputConatiner.hidden = false;
  clearInterval(countdownActive);
  countTitle = "";
  countdownDate = "";
  localStorage.removeItem("countdown");
}

countdownForm.addEventListener("submit", (e) => {
  e.preventDefault();
  countTitle = e.srcElement[0].value;
  countdownDate = e.srcElement[1].value;
  savedCountdown = {
    title: countTitle,
    date: countdownDate,
  };
  localStorage.setItem("countdown", JSON.stringify(savedCountdown));
  if (countdownDate === "") {
    alert("Please enter a valid date");
  } else {
    countdownValue = new Date(countdownDate).getTime();
    updateDOM();
  }
});

function restore() {
  if (localStorage.getItem("countdown")) {
    inputConatiner.hidden = true;
    savedCountdown = JSON.parse(localStorage.getItem("countdown"));
    countTitle = savedCountdown.title;
    countdownDate = savedCountdown.date;
    countdownValue = new Date(countdownDate).getTime();
    updateDOM();
  }
}

countdownBtn.addEventListener("click", resetValues);
completeBtn.addEventListener("click", resetValues);

restore();

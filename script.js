"use strict";

// Game state variables
let scores, currentScore, currentPlayer, playing;

// Selecting elements
const btnRoll = document.querySelector(".btn--roll");
const btnNew = document.querySelector(".btn--new");
const btnHold = document.querySelector(".btn--hold");

const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");

const diceEl = document.querySelector(".dice");

// Modal elements
const btnRules = document.querySelector(".btn--rules");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".close-modal");

// New game initialization
function newGame() {
  scores = [0, 0];
  currentScore = 0;
  currentPlayer = 0;
  playing = true;

  diceEl.classList.add("hidden");

  for (let i = 0; i < scores.length; i++) {
    document.getElementById(`current--${i}`).textContent = 0;
    document.getElementById(`score--${i}`).textContent = 0;
    document.getElementById(`name--${i}`).textContent = `Player ${i + 1}`;
    document
      .querySelector(`.player--${i}`)
      .classList.remove("player--winner", "player--active");
  }

  player0El.classList.add("player--active");
}

// Change player
function changePlayer() {
  currentScore = 0;
  document.getElementById(`current--${currentPlayer}`).textContent = 0;
  currentPlayer = currentPlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
}

// Roll dice
function rollDice() {
  if (playing) {
    const dice = Math.floor(Math.random() * 6) + 1;
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;

    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${currentPlayer}`).textContent =
        currentScore;
    } else {
      changePlayer();
    }
  }
}

// Hold current score
function hold() {
  if (playing) {
    scores[currentPlayer] += currentScore;
    document.getElementById(`score--${currentPlayer}`).textContent =
      scores[currentPlayer];

    if (scores[currentPlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${currentPlayer}`)
        .classList.add("player--winner");
      document.getElementById(`name--${currentPlayer}`).textContent = "WINNER!";
    } else {
      changePlayer();
    }
  }
}

// Modal control
const openCloseModal = function () {
  modal.classList.toggle("hidden");
  overlay.classList.toggle("hidden");
};

// Event listeners
btnNew.addEventListener("click", newGame);
btnRoll.addEventListener("click", rollDice);
btnHold.addEventListener("click", hold);

btnRules.addEventListener("click", openCloseModal);
btnCloseModal.addEventListener("click", openCloseModal);
overlay.addEventListener("click", openCloseModal);

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape" && !modal.classList.contains("hidden")) {
    openCloseModal();
  }
});

// Start a new game on load
newGame();

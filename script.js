'use strict';

let scores;
let currentScore;
let currentPlayer;
let playing;

//Selecting elements
const btnRoll = document.querySelector('.btn--roll');
const bntNew = document.querySelector('.btn--new');
const bntHold = document.querySelector('.btn--hold');

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const diceEl = document.querySelector('.dice');

const btnRules = document.querySelector('.btn--rules');

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnsShowModal = document.querySelectorAll('.show-modal');

let i = 1;

const incrementImage = () => {
  diceEl.classList.remove('hidden');
  diceEl.setAttribute('src', `dice-${i}.png`);

  if (++i <= 6) {
    window.setTimeout(incrementImage, 50);
  }
};

function newGame() {
  diceEl.classList.add('hidden');

  playing = true;
  currentPlayer = 0;
  currentScore = 0;
  scores = [0, 0];

  for (let i = 0; i < scores.length; i++) {
    document.getElementById(`current--${i}`).textContent = 0;
    document.getElementById(`score--${i}`).textContent = 0;
    document.getElementById(`name--${i}`).textContent = `Player ${i + 1}`;
    document.querySelector(`.player--${i}`).classList.remove('player--winner');
  }

  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
}

function changePlayer() {
  document.getElementById(`current--${currentPlayer}`).textContent = 0;
  currentScore = 0;
  currentPlayer = currentPlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
}

function rollDice() {
  const dice = Math.floor(Math.random() * 6) + 1;
  console.log(dice);

  diceEl.setAttribute('src', `dice-${dice}.png`);

  if (dice !== 1) {
    currentScore += dice;
    document.getElementById(`current--${currentPlayer}`).textContent =
      currentScore;
  } else {
    changePlayer();
  }
}

const openCloseModal = function () {
  modal.classList.toggle('hidden');
  overlay.classList.toggle('hidden');
};

bntNew.addEventListener('click', newGame);

btnRoll.addEventListener('click', function () {
  if (playing) {
    i = 1;
    incrementImage();

    setTimeout(rollDice, 500);
  }
});

bntHold.addEventListener('click', function () {
  if (playing) {
    scores[currentPlayer] += currentScore;
    document.getElementById(`score--${currentPlayer}`).textContent =
      scores[currentPlayer];

    if (scores[currentPlayer] >= 100) {
      document
        .querySelector(`.player--${currentPlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${currentPlayer}`)
        .classList.add('player--active');

      document.getElementById(`name--${currentPlayer}`).textContent = 'WINNER!';
      playing = false;
    } else {
      changePlayer();
    }
  }
});

btnRules.addEventListener('click', openCloseModal);

btnCloseModal.addEventListener('click', openCloseModal);
overlay.addEventListener('click', openCloseModal);

document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape' && !modal.classList.contains('hidden'))
    openCloseModal();
});

newGame();

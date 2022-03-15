'use strict';

// Set DOM elements

// How to Play elements
const howBtn = document.querySelector('.how-btn');
const howWindow = document.querySelector('.how-to-play');
const howOverlay = document.querySelector('.how-overlay');
const closeHowBtn = document.querySelector('.close-how');
const newGameBtn = document.querySelector('.new-game');

// Gameplay Elements

//Player One Elements
const playerOneMessage = document.querySelector('.player1-message');
const playerOneOverlay = document.querySelector('.p1-overlay');
const playerOneScore = document.querySelector('.p1-score');
const playerOneCurrent = document.querySelector('.p1-current-hold');
const playerOneRoll = document.querySelector('.p1-roll');
const playerOneHold = document.querySelector('.p1-hold');

// Player Two Elements
const playerTwoMessage = document.querySelector('.player2-message');
const playerTwoOverlay = document.querySelector('.p2-overlay');
const playerTwoScore = document.querySelector('.p2-score');
const playerTwoCurrent = document.querySelector('.p2-current-hold');
const playerTwoRoll = document.querySelector('.p2-roll');
const playerTwoHold = document.querySelector('.p2-hold');

// Dice Elements
const diceBox = document.querySelector('.dice');
const dice = document.getElementById('diceImg');
const diceArr = [
  'images/dice1.png',
  'images/dice2.png',
  'images/dice3.png',
  'images/dice4.png',
  'images/dice5.png',
  'images/dice6.png',
];

// State Variables
let diceRoll = 0;
let score;
let current = 0;

// How to Play Modal
howBtn.addEventListener('click', function () {
  removeHidden(howWindow);
  removeHidden(howOverlay);
});

howOverlay.addEventListener('click', function () {
  addHidden(howOverlay);
  addHidden(howWindow);
});

closeHowBtn.addEventListener('click', function () {
  addHidden(howOverlay);
  addHidden(howWindow);
});

// Gameplay Logic

// Player 1 Rolls
playerOneRoll.addEventListener('click', function () {
  removeHidden(diceBox);
  diceRoll = Math.trunc(Math.random() * 6) + 1;
  changeDiceImg(`images/dice${diceRoll}.png`);
  current += diceRoll;
  playerOneCurrent.textContent = current;
  if (diceRoll === 1) playerTwoTurn();
});

playerOneHold.addEventListener('click', function () {
  score = Number(playerOneScore.textContent) + current;
  playerOneScore.textContent = score;
  console.log(score);
  if (score >= 100) {
    playerOneMessage.textContent = 'PLAYER 1 WINS! 🥇';
    gameEnd();
  } else playerTwoTurn();
});

// Player 2 Rolls
playerTwoRoll.addEventListener('click', function () {
  diceRoll = Math.trunc(Math.random() * 6) + 1;
  changeDiceImg(`images/dice${diceRoll}.png`);
  current += diceRoll;
  playerTwoCurrent.textContent = current;
  if (diceRoll === 1) playerOneTurn();
});

playerTwoHold.addEventListener('click', function () {
  score = Number(playerTwoScore.textContent) + current;
  playerTwoScore.textContent = score;
  if (score >= 100) {
    playerTwoMessage.textContent = 'PLAYER 2 WINS! 🥇';
    gameEnd();
  } else playerOneTurn();
});

// Reset values for New Game
newGameBtn.addEventListener('click', function () {
  playerOneCurrent.textContent = 0;
  playerOneScore.textContent = 0;
  playerTwoCurrent.textContent = 0;
  playerTwoScore.textContent = 0;

  playerOneRoll.disabled = false;
  playerOneHold.disabled = false;
  playerTwoRoll.disabled = false;
  playerTwoHold.disabled = false;

  playerOneMessage.textContent = 'PLAYER 1';
  playerTwoMessage.textContent = 'PLAYER 2';

  addHidden(diceBox);
  playerOneTurn();
});

// Reusable functions
function addHidden(element) {
  element.classList.add('hidden');
}

function removeHidden(element) {
  element.classList.remove('hidden');
}

function changeDiceImg(source) {
  dice.src = source;
}

function playerOneTurn() {
  playerOneOverlay.classList.add('overlay-active');
  playerOneOverlay.classList.remove('overlay-unactive');

  playerTwoOverlay.classList.remove('overlay-active');
  playerTwoOverlay.classList.add('overlay-unactive');
  current = 0;
  playerTwoCurrent.textContent = current;
}

function playerTwoTurn() {
  playerTwoOverlay.classList.add('overlay-active');
  playerTwoOverlay.classList.remove('overlay-unactive');

  playerOneOverlay.classList.remove('overlay-active');
  playerOneOverlay.classList.add('overlay-unactive');
  current = 0;
  playerOneCurrent.textContent = current;
}

function gameEnd() {
  current = 0;
  addHidden(diceBox);
  playerOneRoll.disabled = true;
  playerOneHold.disabled = true;
  playerOneCurrent.textContent = current;

  playerTwoRoll.disabled = true;
  playerTwoHold.disabled = true;
  playerTwoCurrent.textContent = current;
}

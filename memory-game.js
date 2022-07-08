"use strict";

/** Memory game: find matching pairs of cards and flip both of them. */

// initialize data;
let count = 0;
let COLORS = [];
let bestScore = 0;
const WAIT_MSECS = 1000;

let colorData = [
  "red", "orange", "yellow", "green", "blue", "indigo",
  "purple", "pink", "gray", "black", "white", "brown",
];
colorData = shuffle(colorData); // shuffle database of colors

// start game when button is clicked
function startGame(){
  let rows = Number(document.getElementById("rows").value);
  let columns = 4;
  let temp = [];
  COLORS = [];
  count = 0;

  for(let i=0; i<(rows*columns/2); i++){
    temp.push(colorData[i]);
    COLORS = temp.concat(temp);
  }

  createCards(shuffle(COLORS));
  addClickListeners();
  countScore();
}

/** Shuffle array items in-place and return shuffled array. */

function shuffle(items) {
  // This algorithm does a "perfect shuffle", where there won't be any
  // statistical bias in the shuffle (many naive attempts to shuffle end up not
  // be a fair shuffle). This is called the Fisher-Yates shuffle algorithm; if
  // you're interested, you can learn about it, but it's not important.

  for (let i = items.length - 1; i > 0; i--) {
    // generate a random index between 0 and i
    let j = Math.floor(Math.random() * i);
    // swap item at i <-> item at j
    [items[i], items[j]] = [items[j], items[i]];
  }
  return items;
}

/** Create card for every color in colors (each will appear twice)
 *
 * Each div DOM element will have:
 * - a class with the value of the color
 * - a click event listener for each card to handleCardClick
 */

function createCards(colors) {
  const gameBoard = document.getElementById("game");
  let board = '';

  for (let color of colors) {
    // missing code here ...
    board += `
    <div class="card ${color} off"></div>
    `;
  }
  gameBoard.innerHTML = board;
}

/** Flip a card face-up. */
function flipCard(card) {
  // ... you need to write this ...
  card.classList.toggle("off");
}

/** Flip a card face-down. */
function unFlipCard(firstCard, card) {
  // ... you need to write this ...
  firstCard.classList.toggle("off");
  card.classList.toggle("off");
  ignoreClick = false;
}

/** Handle clicking on a card: this could be first-card or second-card. */
let firstCard = false;
let ignoreClick = false;

function handleCardClick(event) {
  // ... you need to write this ...
  let card = event.target;

  if (!card.classList.contains("off") || ignoreClick){
    return;
  } else {
    flipCard(card);
  }

  count++;
  countScore();

  if (!firstCard) {
    firstCard = card;

  } else if (firstCard.classList.length > 0) {
    if (firstCard.classList[1] !== card.classList[1]){
      ignoreClick = true;
      setTimeout(unFlipCard, WAIT_MSECS, firstCard, card);
      firstCard = false;
    } else {
      firstCard = false;
      if (checkForWin()) {
        setTimeout(handleWin, 500);
      }
    }
  }
}

// Add "click listener" to each cell
function addClickListeners() {
  for (let cell of document.querySelectorAll(".card")) {
    cell.addEventListener("click", handleCardClick)
  }
}

// Look at all cells to see if won -- returns true/false
function checkForWin() {
  for (let cell of document.querySelectorAll(".card")) {
    if (cell.classList.contains("off")) {
      return false;
    }
  }
  return true;
}

// pop up a winning message
function handleWin() {
  alert("Well Done! Press Reset To Play Again");
}

// keep count of current score
function countScore(){
  let scoreBoard = document.getElementById("score");
  let score = '';

    score += `
    Score: ${count}
    `;
  scoreBoard.innerHTML = score;
}

document.getElementById("start").addEventListener("click", startGame);
document.getElementById("reset").addEventListener("click", startGame);
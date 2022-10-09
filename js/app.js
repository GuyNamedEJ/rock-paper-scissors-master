/**
 * Game is broken up into 3 stages
 * Stage 1 - Player selects
 *  - When the player picks, hold reference to selection
 *  - hide select panel and show compare panel
 *  - set player pick icon to the player's selection
 * Stage 2 - AI selects
 * - after a delay, player makes random selection
 * - display the computer selection
 * Stage 3 - determine winner
 * -
 *  */
// Game Variables
let playerPick;
let aiPick;
let options = ["rock", "paper", "scissors"];
let score = localStorage.getItem("score");

// Get references to the buttons
let rock = document.getElementById("rock");
let paper = document.getElementById("paper");
let scissors = document.getElementById("scissors");

// Get references to variables
let pickPanel = document.getElementById("stage-1");
let aiSelect = document.getElementById("stage-2");
let resultPanel = document.getElementById("result-panel");
let resultText = document.getElementById("result-text");
let playerPickDisplay = document.getElementById("player-pick-container");
let scoreDisplay = document.getElementById("score-display");
let aiPickDisplay = document.getElementById("ai-pick-container");
let playerPickIcon = document.getElementById("player-pick");
let aiPickIcon = document.getElementById("ai-pick");
let resetBtn = document.getElementById('reset-btn')

// Rules Modal
let rulesBtn = document.getElementById('rules-btn')
let rulesModal = document.getElementById('rules-modal')
let mobileClose = document.getElementById('mobile-close')
rock.addEventListener("click", GetPlayerPick)
paper.addEventListener("click", GetPlayerPick)
scissors.addEventListener("click", GetPlayerPick)
resetBtn.addEventListener("click", PlayAgain)
scoreDisplay.textContent = localStorage.getItem("score")

rulesBtn.onclick = function() {
    rulesModal.style.display = "flex";
  }

mobileClose.onclick = function() {
    rulesModal.style.display = "none";
  }

  window.onclick = function(event) {
    if (event.target == rulesModal) {
      rulesModal.style.display = "none";
    }
}

function GetPlayerPick() {
  playerPick = this.id;
  pickPanel.style.display = "none";
  aiSelect.style.display = "flex";
  DisplayPicks();
}

function GetAIPick() {
  let random = Math.floor(Math.random() * 3);
  aiPick = options[random];
  aiPickDisplay.classList.add(`${aiPick}`);
  aiPickIcon.src = `/images/icon-${aiPick}.svg`;
  
}

function ComparePicks() {
  // Rock Beats Scissors
  // Scissors beats Paper
  // Paper beats Rock
  if((playerPick === 'rock' && aiPick === 'scissors') ||
  (playerPick === 'scissors' && aiPick === 'paper') ||
  (playerPick === 'paper' && aiPick === 'rock'))
  {
    Win()
  }
  // Draw
  else if (playerPick === aiPick) 
  {
    Draw()
  }

  else{
    Lose()
  }

  resultPanel.style.display = "flex";
}

function Win() {
  score++;
  localStorage.setItem("score", score);
  resultText.textContent = "You Win";
  scoreDisplay.textContent = localStorage.getItem("score");
}

function Lose() {
  resultText.textContent = "You Lose";
}

function Draw() {
    resultText.textContent = "Draw";
  }

function DisplayPicks() {
  playerPickDisplay.classList.add(`${playerPick}`);
  playerPickIcon.src = `/images/icon-${playerPick}.svg`;
  //setTimeout(GetAIPick,500)
  GetAIPick();
  ComparePicks();
}

function PlayAgain()
{
    resultPanel.style.display = 'none'
    aiSelect.style.display = 'none'
    pickPanel.style.display = 'block'
    playerPickDisplay.classList.remove(`${playerPick}`);
    aiPickDisplay.classList.remove(`${aiPick}`);
    aiPickIcon.src = " ";
}
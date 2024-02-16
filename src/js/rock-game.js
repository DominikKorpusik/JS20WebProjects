const playerScoreEl = document.getElementById("playerScore");
const playerChoiceEl = document.getElementById("playerChoice");
const computerScoreEl = document.getElementById("computerScore");
const computerChoiceEl = document.getElementById("computerChoice");
const resultText = document.getElementById("resultText");

const playerChoices = {
  rock: document.getElementById("playerRock"),
  paper: document.getElementById("playerPaper"),
  scissors: document.getElementById("playerScissors"),
  spock: document.getElementById("playerSpock"),
  lizard: document.getElementById("playerLizard"),
};

const computerChoices = {
  rock: document.getElementById("computerRock"),
  paper: document.getElementById("computerPaper"),
  scissors: document.getElementById("computerScissors"),
  spock: document.getElementById("computerSpock"),
  lizard: document.getElementById("computerLizard"),
};

const allGameIcons = document.querySelectorAll(".far");

const choices = {
  rock: { name: "Rock", defeats: ["scissors", "lizard"] },
  paper: { name: "Paper", defeats: ["rock", "spock"] },
  scissors: { name: "Scissors", defeats: ["paper", "lizard"] },
  lizard: { name: "Lizard", defeats: ["paper", "spock"] },
  spock: { name: "Spock", defeats: ["scissors", "rock"] },
};

// Passing player selection value

let playerScoreNumber = 0;
let computerScoreNumber = 0;
let computerChoice = "";

// Reset all 'selected' icons, remove confetti
function resetSelected() {
  allGameIcons.forEach((icon) => {
    icon.classList.remove("selected");
  });
}

// Reset score & playerChoice/computerChoice
function resetAll() {
  playerScoreNumber = 0;
  computerScoreNumber = 0;
  playerScoreEl.textContent = playerScoreNumber;
  computerScoreEl.textContent = computerScoreNumber;
  playerChoiceEl.textContent = "";
  computerChoiceEl.textContent = "";
  resultText.textContent = "";
  resetSelected();
}
window.resetAll = resetAll;

// Random computer choice
function computerRandomChoice() {
  const computerChoiceNumber = Math.random();
  if (computerChoiceNumber < 0.2) {
    computerChoice = "rock";
  } else if (computerChoiceNumber <= 0.4) {
    computerChoice = "paper";
  } else if (computerChoiceNumber <= 0.6) {
    computerChoice = "scissors";
  } else if (computerChoiceNumber <= 0.8) {
    computerChoice = "lizard";
  } else {
    computerChoice = "spock";
  }
}

const selectedChoice = (who, choice) => {
  if (who === playerChoices)
    playerChoiceEl.textContent = `--- ${choices[choice].name}`;
  else computerChoiceEl.textContent = `--- ${choices[choice].name}`;

  if (typeof who[choice] !== "undefined") {
    who[choice].classList.add("selected");
  }
};

// Add 'selected' styling & computerChoice
function displayComputerChoice() {
  let choiceName = choices[computerChoice].name.toLowerCase();
  selectedChoice(computerChoices, choiceName);
}

// Passing player selection value and styling icons
function select(playerChoice) {
  checkResult(playerChoice);
  let choiceName = choices[playerChoice].name.toLowerCase();
  selectedChoice(playerChoices, choiceName);
}

// Check result, increase scores, update resultText
function updateScore(playerChoice) {
  if (playerChoice === computerChoice) {
    resultText.textContent = "It's a tie.";
  } else {
    const choice = choices[playerChoice];
    if (choice.defeats.indexOf(computerChoice) > -1) {
      resultText.textContent = "You Won!";
      playerScoreNumber++;
      playerScoreEl.textContent = playerScoreNumber;
    } else {
      resultText.textContent = "You Lost!";
      computerScoreNumber++;
      computerScoreEl.textContent = computerScoreNumber;
    }
  }
}

// Call functions to process turn
function checkResult(playerChoice) {
  resetSelected();
  computerRandomChoice();
  displayComputerChoice();
  updateScore(playerChoice);
}

window.select = select;

// On startup, set initial values
resetAll();

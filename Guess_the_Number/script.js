
let correctNumber = getRandomNumber();
let guesses = [];

window.onload = function () {
  document.getElementById("number-submit").addEventListener("click", playGame);
  document.getElementById("restart-game").addEventListener("click", initGame);
};

function playGame() {
  let numberGuess = document.getElementById("number-guess").value;
  displayResult(numberGuess);
  saveGuessHistory(numberGuess);
}

function displayResult(numberGuess) {
  if (numberGuess <= correctNumber + 3 && numberGuess >= correctNumber - 3) {
    if (numberGuess == correctNumber) {
      showYouWon();
      randomAgain();
      return;
    }
    showYouClose();
  } else if (numberGuess < correctNumber) {
    showNumberBelow();
  } else if (numberGuess > correctNumber) {
    showNumberAbove();
  }
}

//! ------> Alerts for game <----- !//

function getDialog(dialogType, text) {
  let dialog;
  switch (dialogType) {
    case "warning":
      dialog = '<div class = "alert alert-warning   m-4" role="alert" >';
      break;
    case "close":
      dialog = '<div class="alert alert-info  m-4" role="alert">';
      break;
    case "won":
      dialog = '<div class = "alert alert-success  m-4 " role="alert" >';
      break;
  }

  dialog += text;
  dialog += "</div>";
  return dialog;
}

function showYouWon() {
  const text = "Awesome job, You got it!!";
  let dialog = getDialog("won", text);
  document.getElementById("result").innerHTML = dialog;
}

function showYouClose() {
  const text = "Your guess is Close to the Number!!";
  let dialog = getDialog("close", text);
  document.getElementById("result").innerHTML = dialog;
}

function showNumberAbove() {
  const text = "Your guess is Too High!!";
  let dialog = getDialog("warning", text);
  document.getElementById("result").innerHTML = dialog;
}

function showNumberBelow() {
  const text = "Your guess is Too Low!!";
  let dialog = getDialog("warning", text);
  document.getElementById("result").innerHTML = dialog;
}

//! ------x Alerts for game x----- !//

function getRandomNumber() {
  let randomNumber = Math.floor(Math.random() * 100) + 1; 
  return randomNumber;
}

//! ------> Save Guesses & display <------- !//

function saveGuessHistory(numberGuess) {
  guesses.push(numberGuess);
  displayHistory();
}

function displayHistory() {
  let index = guesses.length - 1;
  let list = '<ul class=" list-group">';
  while (index >= 0) {
    list +=
      '<li class="list-group-item">' +
      "You Guessed " +
      guesses[index] +
      "</li>";
    index--;
  }
  list += "</ul>";
  document.getElementById("history").innerHTML = list;
}

//! ------x Save Guesses & display x------- !//

//! ------> Reset the Game <---------!//

function initGame() {
  randomAgain();
  document.getElementById("result").innerHTML = "";
  document.getElementById("number-guess").value = "";
  guesses = [];
  displayHistory();
}

function randomAgain() {
  correctNumber = getRandomNumber();
}

//! ------x Reset the Game x---------!//

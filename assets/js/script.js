//Global Variables
var main = document.getElementById("gameCards");

var firstCardClicked;
var secondCardClicked;
var firstCardClasses;
var secondCardClasses;

var maxMatches = 9;
var matches = 0;
var attempts = 0;
var gamesPlayed = 0;


var cardClasses = ["rick-face", "rick-face", "morty-face", "morty-face", "summer-face", "summer-face", "beth-face", "beth-face", "jerry-face", "jerry-face", "meeseek-face", "meeseek-face", "poopybutthole-face", "poopybutthole-face", "snuffles-face", "snuffles-face", "birdperson-face", "birdperson-face"];

var cardFrontClass = document.getElementsByClassName("card-front");

// Function Definitions

function handleClick(event) {
  playAudio();
  if (event.target.className.indexOf("card-back") === -1) {
    return;
  }
  var target = event.target;
  target.classList.add("hidden")

  if (!firstCardClicked) {
    firstCardClicked = target;
    firstCardClasses = firstCardClicked.previousElementSibling.className;
  } else {
    secondCardClicked = target;
    secondCardClasses = secondCardClicked.previousElementSibling.className;
    main.removeEventListener("click", handleClick);
    attempts++;

    if (firstCardClasses === secondCardClasses) {
      main.addEventListener("click", handleClick);
      firstCardClicked = null;
      secondCardClicked = null;
      matches++;
      if (matches === maxMatches) {
        stopAudio();
        var modalWindow = document.querySelector("div.modal-overlay");
        modalWindow.classList.remove("hidden");
      }
    } else {
      setTimeout(function () {
        firstCardClicked.classList.remove("hidden");
        secondCardClicked.classList.remove("hidden");
        main.addEventListener("click", handleClick);
        firstCardClicked = null;
        secondCardClicked = null;
      }, 1000);
    }
    displayStats();
  }
}

function displayStats() {
  var gamesPlayedNumber = document.getElementById("games-played-number").textContent = gamesPlayed;
  document.getElementById("games-played-number").style.fontFamily = "Bangers, cursive";
  document.getElementById("games-played-number").style.fontSize = "2rem";

  var attemptsNumber = document.getElementById("attempts-number").textContent = attempts;
  document.getElementById("attempts-number").style.fontFamily = "Bangers, cursive";
  document.getElementById("attempts-number").style.fontSize = "2rem";

  var accuracyNumber = document.getElementById("accuracy-number").textContent = calculateAccuracy(attempts, matches);
  document.getElementById("accuracy-number").style.fontFamily = "Bangers, cursive";
  document.getElementById("accuracy-number").style.fontSize = "2rem";
}

function calculateAccuracy(attempts, matches) {
  if (!attempts) {
    return "0%";
  }
  var result = Math.trunc((matches / attempts) * 100);
  result += "%"
  return result;
}

function resetGame() {
  attempts = 0;
  matches = 0;
  gamesPlayed++;
  displayStats();
  resetCards();
  shuffleCards();
  var modalWindow = document.querySelector("div.modal-overlay");
  modalWindow.classList.add("hidden");
}

function resetCards() {
  var hiddenCards = document.querySelectorAll("div.card-back");
  for (index = 0; index < hiddenCards.length; index++) {
    hiddenCards[index].classList.remove("hidden");
  }
}

function shuffleCards() {
  for (var i = 0; i < cardClasses.length; i++) {
    var randomPosition = Math.floor(Math.random() * cardClasses.length);
    var placeHolder = cardClasses[i];
    cardClasses[i] = cardClasses[randomPosition];
    cardClasses[randomPosition] = placeHolder;
  }
  displayCards();
}

function displayCards() {
  for (var i = 0; i < cardFrontClass.length; i++) {
    cardFrontClass[i].className = "card-front" + " " + cardClasses[i];
  }
}

function createCards() {
  for (var i = 0; i < cardClasses.length; i++) {
    var div = document.createElement("div");
    div.classList.add("card", "col-2");

    var cardFront = document.createElement("div");
    cardFront.classList.add("card-front", cardClasses[i]);

    var cardBack = document.createElement("div");
    cardBack.classList.add("card-back");

    div.append(cardFront, cardBack);
    main.append(div);
  }
}

function playAudio() {
  audioFile.play();
}

function stopAudio() {
  audioFile.pause();
  audioFile.currenTime = 0;
}

//Function Calls, Statements
window.addEventListener("load", load);
function load() {
  createCards();
  shuffleCards();
}

main.addEventListener("click", handleClick);

var button = document.getElementById("reset");
button.addEventListener("click", resetGame)

var audioFile = document.querySelector("audio");

var firstCardClicked;
var secondCardClicked;
var firstCardClasses;
var secondCardClasses;

var maxMatches = 9;
var matches = 0;

var attempts = 0;
var gamesPlayed = 0;

var main = document.getElementById("gameCards");
main.addEventListener("click", handleClick);

function handleClick(event) {
  if (event.target.className.indexOf("card-back") === -1) {
    return;
  }
  var target = event.target;
  target.classList.add("hidden")

//Match 2 Cards
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
        var modalWindow = document.querySelector("div.modal-overlay");
        modalWindow.classList.remove("hidden");
      }
    } else {
      setTimeout(function() {
        firstCardClicked.classList.remove("hidden");
        secondCardClicked.classList.remove("hidden");
        main.addEventListener("click", handleClick);
        firstCardClicked = null;
        secondCardClicked = null;
        console.log(attempts);
      }, 1500);
    }
    displayStats();
  }

}


function displayStats() {
  document.getElementById("games-played-number").textContent = gamesPlayed;

  attemptsEl = document.getElementById("attempts-number").textContent = attempts;

  document.getElementById("accuracy-number").textContent = calculateAccuracy(attempts, matches);
}

function calculateAccuracy(attempts, matches) {
  if (!attempts) {
    return "0%";
  }
  var result = Math.trunc((matches/attempts) * 100);
  result += "%"
  return result;
}

function resetGame() {
  attempts = 0;
  matches = 0;
  gamesPlayed++;
  displayStats();
  resetCards();
  var modalWindow = document.querySelector("div.modal-overlay");
  modalWindow.classList.add("hidden");
}

function resetCards(){
  var hiddenCards = document.querySelectorAll("div.card-back");
  for (index=0; index < hiddenCards.length; index++) {
    hiddenCards[index].classList.remove("hidden");
  }
}

var button = document.getElementById("reset");
button.addEventListener("click", resetGame)

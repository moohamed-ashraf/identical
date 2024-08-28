const images = [
  "assets/2-D.png",
  "assets/2-D.png",
  "assets/3-C.png",
  "assets/3-C.png",
  "assets/4-H.png",
  "assets/4-H.png",
  "assets/5-S.png",
  "assets/5-S.png",
  "assets/6-D.png",
  "assets/6-D.png",
  "assets/7-C.png",
  "assets/7-C.png",
  "assets/8-H.png",
  "assets/8-H.png",
  "assets/A-S.png",
  "assets/A-S.png",
];

const backImage = "assets/BACK.png";
let flippedCards = [];
let matchedPairs = 0;
let lockBoard = false;
let timeoutId;

const board = document.getElementById("board");
const resetButton = document.getElementById("reset-button");
const message = document.getElementById("message");
function initializeGame() {
  const shuffledImages = shuffle(images);
  board.innerHTML = "";
  message.textContent = "";

  shuffledImages.forEach((image, index) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.image = image;
    card.addEventListener("click", flipCard);

    const frontImg = document.createElement("img");
    frontImg.src = image;
    frontImg.classList.add("front-face");

    const backImg = document.createElement("img");
    backImg.src = backImage;
    backImg.classList.add("back-face");

    card.appendChild(frontImg);
    card.appendChild(backImg);
    board.appendChild(card);
  });
}

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function flipCard() {
  if (lockBoard || this.classList.contains("flipped")) return;

  this.classList.add("flipped");
  flippedCards.push(this);

  if (flippedCards.length === 2) {
    checkForMatch();
  } else {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      flippedCards[0].classList.remove("flipped");
      flippedCards = [];
    }, 5000);
  }
}

function checkForMatch() {
  lockBoard = true;

  const [card1, card2] = flippedCards;

  if (card1.dataset.image === card2.dataset.image) {
    setTimeout(() => {
      card1.classList.add("hidden");
      card2.classList.add("hidden");
    }, 1000);
    message.textContent = "WOW!😲";

    matchedPairs++;
    setTimeout(() => {
      message.textContent = "";
    }, 1000);

    if (matchedPairs === images.length / 2) {
      message.textContent = "You won!🎊";
    }

    resetTurn();
  } else {
    setTimeout(() => {
      card1.classList.remove("flipped");
      card2.classList.remove("flipped");
      resetTurn();
    }, 1000);
  }
}

function resetTurn() {
  flippedCards = [];
  lockBoard = false;
}

resetButton.addEventListener("click", () => {
  matchedPairs = 0;
  clearTimeout(timeoutId);
  initializeGame();
  message.textContent = "Game reset.";
});

initializeGame();

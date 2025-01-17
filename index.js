const colorName = [
  "Red",
  "Green",
  "Blue",
  "White",
  "Black",
  "Purple",
  "Yellow",
  "Brown",
  "Pink",
  "Cyan",
  "Navy",
  "grey",
  "Lime",
  "olive",
  "Teal",
  "Maroon",
  "darkgoldenrod",
  "orange",
  "violet",
  "chocolate",
];

let winningScore = 10;

let targetColor = "";

let currentScore = 0;

let timer = 120;

let gameInterval, timeInterval;

const setRandomColor = () => {
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => {
    const randomIndex = Math.floor(Math.random() * colorName.length);
    const randomColor = colorName[randomIndex];
    cell.style.backgroundColor = randomColor;
    cell.setAttribute("data-color", randomColor);
  });
};

const setTargetColor = () => {
  const randomIndex = Math.floor(Math.random() * colorName.length);
  targetColor = colorName[randomIndex];
  document.querySelector("#targetColor").textContent = targetColor;
};

const updateTimer = () => {
  timer--;
  document.querySelector("#timer").textContent = formatTime(timer);
  if (timer <= 0) {
    endGame(false);
  }
};

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes}: ${secs < 10 ? "0" : ""}${secs}`;
};

const startGame = () => {
  currentScore = 0;
  timer = 120;
  document.querySelector("#score").textContent = currentScore;
  document.querySelector("#timer").textContent = formatTime(timer);
  document.querySelector("#congratsOverlay").style.display = "none";
  document.querySelector("#loseOverlay").style.display = "none";
  setRandomColor();
  setTargetColor();

  const bgMusic = document.querySelector("#backgroundMusic");
  //   bgMusic.play();

  gameInterval = setInterval(setRandomColor, 1000);
  timeInterval = setInterval(updateTimer, 1000);
};

const endGame = (isWin) => {
  clearInterval(gameInterval);
  clearInterval(timeInterval);

  const overlay = isWin
    ? document.querySelector("#congratsOverlay")
    : document.querySelector("#loseOverlay");

  overlay.style.display = "block";

  if (isWin) {
    document.querySelector("#winMusic").play();
  } else {
    document.querySelector("#loseMusic").play();
  }
};

const handelBoxClick = (e) => {
  const clickTheColor = e.target.getAttribute("data-color");
  if (clickTheColor === targetColor) {
    currentScore++;
    document.querySelector("#score").textContent = currentScore;

    if (currentScore === winningScore) {
      endGame(true);
    }
    setRandomColor();
    setTargetColor();
    document.querySelector("#correctMusic").play();
  } else {
    document.querySelector("#incorrectMusic").play();
  }
};

document.querySelectorAll(".cell").forEach((cell) => {
  cell.addEventListener("click", handelBoxClick);
});

document
  .querySelector("#restartGameOverlay")
  .addEventListener("click", startGame);
document
  .querySelector("#restartGameOverlayLose")
  .addEventListener("click", startGame);

startGame();

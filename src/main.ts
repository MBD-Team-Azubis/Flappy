import "./style.css";

const body = <HTMLBodyElement>document.getElementById("body");
const button = <HTMLButtonElement>document.getElementById("startbutton");
const name = window.prompt("Whats your name?");
if (name === null) {
  button.disabled = true;
}
const highscore = localStorage.getItem(name);

button.setAttribute(
  "style",
  `color:orange; position: absolute; top:${(
    window.innerHeight * 0.5
  ).toString()}px;left:${(
    window.innerHeight * 0.5
  ).toString()}px;z-index: 1; font-size: 50px;`
);

let height = 25;
let spawntimer = 200;
let scoredtimer = 0;
const cycles = 45;

const obstacleSpeed = 10;

let score = 0;
const obstacleArrLeftBound: number[] = [];

const scoreboard = document.createElement("scoreboard");
const highscoreboard = document.createElement("highscore");
scoreboard.innerHTML = `Scoreboard: ${score.toString()}`;
scoreboard.setAttribute(
  "style",
  `color:orange; position: absolute; top:${(
    window.innerHeight * 0.1
  ).toString()}px;left:${(
    window.innerHeight * 0.5 -
    75
  ).toString()}px;z-index: 1; font-size: 50px;`
);
highscoreboard.setAttribute(
  "style",
  `color:orange; position: absolute; top:${(
    window.innerHeight * 0.2
  ).toString()}px;left:${(
    window.innerHeight * 0.5 -
    75
  ).toString()}px;z-index: 1; font-size: 30px;`
);
body.appendChild(scoreboard);
body.appendChild(highscoreboard);
highscoreboard.innerHTML = `Your highscore ${highscore!}`;
const playerdiv = document.createElement("player");
playerdiv.setAttribute(
  "style",
  `height:75px;width:75px;top: calc(${window.innerHeight.toString()}px * 0.5);left: calc(${(
    window.innerWidth * 0.2
  ).toString()}px);`
);
playerdiv.innerHTML = "🚀";
body.appendChild(playerdiv);

function obstructionSpawn(obstacleheight: number) {
  for (let i = 0; i < 2; i++) {
    const obstacle = document.createElement("Astroid");
    obstacle.innerHTML = "🪨";
    if (i === 1) {
      obstacle.setAttribute(
        "style",
        `height:225px;width:225px;position: absolute;top:${obstacleheight.toString()}px;left: ${window.innerWidth.toString()}px;font-size: 200px;text-align: center; justify-content: center;display: flex;align-content: center;flex-wrap: wrap;`
      );
    } else {
      obstacle.setAttribute(
        "style",
        `height:225px;width:225px;position: absolute;top: ${(
          window.innerHeight -
          225 +
          obstacleheight
        ).toString()}px ;left: ${window.innerWidth.toString()}px;font-size: 200px;text-align: center; justify-content: center;display: flex;align-content: center;flex-wrap: wrap;transform: rotate(0.5turn);`
      );
    }
    obstacle.className = "obstacles";
    body.appendChild(obstacle);
  }
}

function obstructionMove() {
  const obstacles = document.getElementsByClassName("obstacles");
  if (obstacles.length === 0) {
    return;
  }
  for (let i = 0; i < obstacles.length; i++) {
    if (typeof obstacleArrLeftBound[i] === `undefined`) {
      obstacleArrLeftBound[i] = 0;
    }
    obstacles[i].style.left =
      (
        window.innerWidth +
        225 -
        obstacleArrLeftBound[i] * obstacleSpeed
      ).toString() + "px";

    obstacleArrLeftBound[i] += 1;
  }
}

function obstructionDelete() {
  const obstacles = document.getElementsByClassName("obstacles");
  if (obstacles.length === 0) {
    return;
  }
  for (let i = 0; i < 2; i++) {
    if (parseInt(obstacles[0].style.left) < -300) {
      obstacles[0].remove();
      obstacleArrLeftBound.shift();
    }
  }
}

let scoretime = 45;
function difficulty(points: number) {
  if (points === 10) {
    scoretime = 20;
  }
  if (points === 20) {
    clearInterval(intervalID);
    gamestart(60);
  }
}

function currentPosition() {
  const obstacles = document.getElementsByClassName("obstacles");
  if (obstacles.length === 0) {
    return;
  }
  for (let i = 0; i < obstacles.length; i++) {
    const playerleft = parseInt(playerdiv.style.left);
    const playertop = parseInt(playerdiv.style.top);
    const obstacleleft = parseInt(obstacles[i].style.left);
    const upperborder = parseInt(obstacles[i + 1].style.top);
    const lowerborder = parseInt(obstacles[i].style.top);
    if (playerleft > obstacleleft && playerleft < obstacleleft + 225) {
      if (playertop < upperborder + 225 || playertop + 75 > lowerborder) {
        clearInterval(intervalID);
        if (score > parseInt(localStorage.getItem(name!))) {
          localStorage.setItem(name, score.toString());
        }

        alert(" You Lost (in Space)");
      }
    }
    i++;
  }
}

function reversal(k: boolean) {
  if (k) {
    spawntimer--;
  } else {
    spawntimer++;
  }
}
let j = true;
let intervalID = 0;

function gamestart(repetition: number) {
  intervalID = setInterval(() => {
    if (spawntimer >= 200) {
      j = true;
    } else if (spawntimer <= -200) {
      j = false;
    }
    reversal(j);
    obstructionMove();
    currentPosition();
    obstructionDelete();
    scoredtimer++;
    if (scoredtimer === scoretime) {
      obstructionSpawn(spawntimer);
      scoredtimer = 0;
      score++;
      scoreboard.innerHTML = `Score: ${score.toString()}`;
    }
    difficulty(score);
  }, 1000 / repetition);
}
addEventListener("mousemove", (event) => {
  height = event.y;
  playerdiv.setAttribute(
    "style",
    `height:75px;width:75px;top: ${height.toString()}px; left: ${(
      window.innerWidth * 0.2
    ).toString()}px;`
  );
});

button.addEventListener("click", () => {
  gamestart(cycles);
  button.remove();
});

function loadImages() {
  // Globally Defined virusImage variable
  virusImage = new Image();
  virusImage.src = "Assets/virus.png";

  // Globally Defined playerImage variable
  playerImage = new Image();
  playerImage.src = "Assets/player.png";

  // Globally Defined playerImage variable
  gemImage = new Image();
  gemImage.src = "Assets/gem2.png";
}
loadImages();

let canvas = document.getElementById("mycanvas");

let width = 800;
let height = 500;

canvas.width = width;
canvas.height = height;

let pen = canvas.getContext("2d");
// console.log(pen);

let score = 0;
let gameOver = false;

// JSON Objects
let e1 = {
  x: 150,
  y: 50,
  width: 70,
  height: 70,
  speed: 20,
};
let e2 = {
  x: 340,
  y: 250,
  width: 70,
  height: 70,
  speed: 27,
};
let e3 = {
  x: 550,
  y: 20,
  width: 70,
  height: 70,
  speed: 35,
};

let enemy = [e1, e2, e3];

let player = {
  x: 10,
  y: height / 2,
  width: 70,
  height: 70,
  speed: 20,
  moving: "false",
  xPositive: "false",
};

let gem = {
  x: width - 100,
  y: height / 2,
  width: 70,
  height: 70,
};

// Event Listener (Arrow Functions used)
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") {
    player.moving = true;
    player.xPositive = true;
    score += 10;
  }
  if (e.key === "ArrowLeft") {
    player.moving = true;
    player.xPositive = false;
  }
});

document.addEventListener("keyup", (e) => {
  if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
    player.moving = false;
  }
});

// Functions - draw(), update(), iscolliding(), gameLoop()
function draw() {
  pen.clearRect(0, 0, width, height);
  // Draw this enemy[i] Object on the screen
  //   pen.fillStyle = "red";
  //   pen.fillRect(enemy[i].x, enemy[i].y, enemy[i].width, enemy[i].height);

  pen.font = "30px san-serif";
  pen.fillText("Score : " + score, 10, 30);

  // Player Draw
  pen.drawImage(playerImage, player.x, player.y, player.width, player.height);

  // Enemy Draw
  for (let i = 0; i < enemy.length; i++) {
    pen.drawImage(
      virusImage,
      enemy[i].x,
      enemy[i].y,
      enemy[i].width,
      enemy[i].height
    );
  }

  // Gem Draw
  pen.drawImage(gemImage, gem.x, gem.y, gem.width, gem.height);
}

function isColliding(b1, b2) {
  if (
    Math.abs(b1.x - b2.x) <= b1.width - 30 &&
    Math.abs(b1.y - b2.y) <= b1.height - 30
  ) {
    return true;
  }
  return false;
}

function update() {
  // Player State
  if (player.moving == true) {
    if (player.x < 10) {
      player.x = 10;
    }
    if (player.xPositive == true) {
      player.x += player.speed;
    }
    if (player.xPositive == false) {
      player.x -= player.speed;
    }
  }

  for (let i = 0; i < enemy.length; i++) {
    enemy[i].y += enemy[i].speed;
    if (enemy[i].y > height - enemy[i].height || enemy[i].y < 0) {
      enemy[i].speed *= -1;
    }
  }
  // Collision between enemy and player
  for (let i = 0; i < enemy.length; i++) {
    if (isColliding(enemy[i], player)) {
      score = score - i * 10;
      if (score < 0) {
        gameOver = true;
        alert("Game Over");
        player.x = 10;
        score = 0;
      }
    }
  }
  // Collision between Gem and Player
  if (isColliding(gem, player)) {
    gameOver = true;
    draw();
    alert("You Won! Your Score is " + score);
    player.x = 10;
    score = 0;
  }
}

function gameLoop() {
  if (gameOver == true) {
    clearInterval(interval);
  }
  draw();
  update();
}

let interval = setInterval(gameLoop, 70);

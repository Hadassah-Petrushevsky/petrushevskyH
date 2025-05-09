// set up canvas
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

// function to generate random number
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// function to generate random RGB color value
function randomRGB() {
  return `rgb(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)})`;
}

// Class Shape
class Shape{
  constructor(x, y, velX, velY){
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
  }
}

// Class Ball
class Ball extends Shape{
  constructor(x, y, velX, velY, color, size) {
    super(x, y, velX, velY);
    this.color = color;
    this.size = size;
    this.exists = true;
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }

  update() {
    if (this.x + this.size >= width) {
      this.velX = -Math.abs(this.velX);
    }

    if (this.x - this.size <= 0) {
      this.velX = Math.abs(this.velX);
    }

    if (this.y + this.size >= height) {
      this.velY = -Math.abs(this.velY);
    }

    if (this.y - this.size <= 0) {
      this.velY = Math.abs(this.velY);
    }

    this.x += this.velX;
    this.y += this.velY;
  }

  collisionDetect() {
    for (const ball of balls) {
      if (!(this === ball) && ball.exists) {
        const dx = this.x - ball.x;
        const dy = this.y - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
  
        if (distance < this.size + ball.size) {
          ball.color = this.color = randomRGB();
        }
      }
    }
  }
}

// Evil Circle
class EvilCircle extends Shape{
  constructor(x, y){
    super(x, y, 20, 20);
    this.size = 10;
    this.color = "white";
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 3;
    ctx.stroke();
  }

  checkBounds() {
    if (this.x + this.size >= canvas.width) this.x = canvas.width - this.size;
    if (this.x - this.size <= 0) this.x = this.size;
    if (this.y + this.size >= canvas.height) this.y = canvas.height - this.size;
    if (this.y - this.size <= 0) this.y = this.size;
  }

  collisionDetect() {
    for (const ball of balls) {
      if (!ball.exists) continue;
      const dx = this.x - ball.x;
      const dy = this.y - ball.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < this.size + ball.size) {
        ball.exists = false; // Ball is eaten
        updateBallCount();
      }
    }
  }
}

let ballCount = 0;
const ballCountDisplay = document.getElementById("ball-count");

const balls = [];

for (let i = 0; i < 30; i++) {
  const size = random(10, 20);
  const ball = new Ball(
    random(0 + size, width - size),
    random(0 + size, height - size),
    random(1, 7),
    random(1, 7),
    randomRGB(),
    size
  );
  balls.push(ball);
  ballCount++;
}

const evilCircle = new EvilCircle(50, 50);

window.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "a":
      evilCircle.x -= evilCircle.velX;
      break;
    case "d":
      evilCircle.x += evilCircle.velX;
      break;
    case "w":
      evilCircle.y -= evilCircle.velY;
      break;
    case "s":
      evilCircle.y += evilCircle.velY;
      break;
  }
});

function updateBallCount(){
  ballCount = balls.filter((ball) => ball.exists).length;
  ballCountDisplay.textContent = "Ball count: " + ballCount;
}

function loop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);


  for (const ball of balls) {
      if (ball.exists) {
        ball.draw();
        ball.update();
        ball.collisionDetect();
      }
  }

  evilCircle.checkBounds();
  evilCircle.draw();
  evilCircle.collisionDetect();

  requestAnimationFrame(loop);
}

loop();
let canvasX = 750;
let canvasY = 500;
let numCharacters = 33;

let SpelunkyGuy;
let Green;
let Robot;

let characters = [];
let movementDir;

function preload() {
  SpelunkyGuy = loadImage("SpelunkyGuy.png");
  Green = loadImage("Green.png");
  Robot = loadImage("Robot.png");
}

function setup() {
  createCanvas(canvasX, canvasY);
  background(225);
  imageMode(CENTER);

  movementDir = 0;
  for (let i = 0; i < numCharacters; i++) {
    if (i % 3 === 0) {
      characters.push(new Character(SpelunkyGuy));
    } else if (i % 3 === 1) {
      characters.push(new Character(Green));
    } else {
      characters.push(new Character(Robot));
    }
  }
}

function draw() {
  background(225);

  characters.forEach((character) => character.move(movementDir));
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    movementDir--;
  } else if (keyCode === RIGHT_ARROW) {
    movementDir++;
  }
}

function keyReleased() {
  if (keyCode === LEFT_ARROW) {
    movementDir++;
  } else if (keyCode === RIGHT_ARROW) {
    movementDir--;
  }
}

class Character {
  constructor(spriteSheet) {
    this.spriteSheet = spriteSheet;

    this.x = random(50, canvasX - 50);
    this.y = random(50, canvasY - 50);
    this.offset = 0;
    this.direction = 1;
  }

  move(movementDir) {
    this.x += movementDir * 3;

    if (movementDir !== 0) {
      this.offset = 80 + 80 * (Math.ceil(frameCount / 4) % 8); //80 -> 640
      this.direction = movementDir;
    } else {
      this.offset = 0;
    }

    push();

    translate(this.x, this.y);
    scale(this.direction, 1);
    image(this.spriteSheet, 0, 0, 100, 100, this.offset, 0, 80, 80);

    pop();
  }
}

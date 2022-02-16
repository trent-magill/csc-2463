// GLOBAL 
var screenX = 640;
var screenY = 480;

var BugSheet, bugs;
var time = 30;
var score = 0;

// P5JS
function preload() {
  BugSheet = loadImage("Bug-Sheet.png");
}

function setup() {
  createCanvas(screenX, screenY);
  imageMode(CENTER);

  bugs = [new Bug(), new Bug(), new Bug()]

}

function draw() {
  background(225, 225, 255);


  if (time > 0) {
    // bugs
    bugs.forEach(bug => bug.step());

    // timer
    if (frameCount % 60 === 0) time--

    // score
    textSize(32);
    text("Time: " + time, 10, 30);
    text("Score: " + score, 10, 60);
  } else {
    // end
    textSize(32);
    text("GAME OVER", 10, 30);
    text("Final score: " + score, 10, 60);
  }

}


function mousePressed() {
  bugs.forEach(bug => bug.click(mouseX, mouseY))
}

// BUG
class Bug {
  constructor() {
    this.x = random(50, screenX - 50)
    this.y = random(50, screenY - 50)
    this.frame = 0;
    this.scaleY = 1;

    this.dead = false;
    this.moveSpeedX = random(-2, 2);
    this.moveSpeedY = random(-1, 1);
  }

  move() {
    if (this.dead) return;

    this.x += this.moveSpeedX;
    this.y += this.moveSpeedY;

    // update movespeed
    if (this.x < 0 || this.x > screenX) this.moveSpeedX *= -1;

    if (this.y < 0 || this.y > screenY) this.moveSpeedY *= -1;
  }

  click(mouseX, mouseY) {
    if (this.dead) return;

    if (dist(this.x, this.y, mouseX, mouseY) < 25) {
      // die
      this.dead = true;
      score++;

      // make a new bug and speed up all bugs 
      // chance to spawn 2 bugs
      if (this.x % 2 > 1) bugs.push(new Bug())
      else { bugs.push(new Bug()); bugs.push(new Bug()); }
      // speed up less if fast
      bugs.forEach(bug => {
        if (bug.moveSpeedX < 1) {
        } else if (bug.moveSpeedX < 5) {
          bug.moveSpeedX *= 1.5, bug.moveSpeedY *= 1.25;
        } else if (bug.moveSpeedX < 10) {
          bug.moveSpeedX *= 1.25, bug.moveSpeedY *= 1.1;
        } else if (bug.moveSpeedX < 20) {
          bug.moveSpeedX *= 1.1, bug.moveSpeedY *= 1.05;
        }
      })
    }
  }

  draw() {
    // update sprite
    if (this.dead) this.frame = 2;
    else this.frame = Math.ceil(frameCount / 10) % 2;
    this.scaleY = this.moveSpeedX > 0 ? 1 : -1;
    // draw
    push();

    translate(this.x, this.y);
    scale(3 * this.scaleY, 3);
    noSmooth();
    image(BugSheet, 0, 0, 16, 16, this.frame * 16, 0, 16);

    pop();
  }

  step() {
    this.move();
    this.draw();
  }
}

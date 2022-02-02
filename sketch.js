let currentColor,
  red,
  orange,
  yellow,
  green,
  cyan,
  blue,
  magenta,
  brown,
  white,
  black;

function setup() {
  createCanvas(750, 500);
  background(225);

  currentColor = 0;

  red = new colorBox(0, "red");
  orange = new colorBox(50, "orange");
  yellow = new colorBox(100, "yellow");
  green = new colorBox(150, "green");
  cyan = new colorBox(200, "cyan");
  blue = new colorBox(250, "blue");
  magenta = new colorBox(300, "magenta");
  brown = new colorBox(350, "brown");
  white = new colorBox(400, "white");
  black = new colorBox(450, "black");
}

function draw() {
  red.appear();
  orange.appear();
  yellow.appear();
  green.appear();
  cyan.appear();
  blue.appear();
  magenta.appear();
  brown.appear();
  white.appear();
  black.appear();

  if (mouseIsPressed) {
    drawing();

    red.onClick();
    orange.onClick();
    yellow.onClick();
    green.onClick();
    cyan.onClick();
    blue.onClick();
    magenta.onClick();
    brown.onClick();
    white.onClick();
    black.onClick();
  }
}

function drawing() {
  push();
  stroke(currentColor);
  strokeWeight(10);
  line(pmouseX, pmouseY, mouseX, mouseY);
  pop();
}

class colorBox {
  constructor(y, color) {
    this.x = 25;
    this.y = y + 25;
    this.r = 45;
    this.color = color;
  }

  appear() {
    push();
    fill(this.color);
    strokeWeight(1);
    stroke(255);

    if (this.color === "white") stroke(25);

    circle(this.x, this.y, this.r);
    pop();
  }

  onClick() {
    if (mouseIsPressed && mouseX < 50) {
      if (dist(this.x, this.y, mouseX, mouseY) < this.r / 2) {
        currentColor = this.color;
      }
    }

    if (this.color === "green") {
      console.log(dist(this.x, this.y, mouseX, mouseY));
    }
  }
}

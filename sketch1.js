var example1 = function (p) {
  p.setup = function () {
    p.createCanvas(610, 300);
  };

  p.draw = function () {
    p.background(100, 255, 100);
    p.fill(250);
    p.circle(150, 150, 270);
    p.rect(325, 15, 270, 270);
  };
};

var myp5 = new p5(example1, "example1");

var example2 = function (p) {
  p.setup = function () {
    p.createCanvas(400, 400);
  };

  p.draw = function () {
    p.background(250);
    p.strokeWeight(0);
    p.fill(255, 0, 0, 100);
    p.circle(200, 155, 150);

    p.fill(0, 255, 0, 100);
    p.circle(155, 240, 150);

    p.fill(0, 0, 255, 100);
    p.circle(245, 240, 150);
  };
};

var myp5 = new p5(example2, "example2");

var example3 = function (p) {
  p.setup = function () {
    p.createCanvas(610, 300);
  };

  p.draw = function () {
    p.background(0);
    p.strokeWeight(0);

    // pacman
    p.fill(255, 255, 150);
    p.circle(150, 150, 270);

    p.fill(0);
    p.rotate(0.78539816339);
    p.rect(77, 3, 135, 135);
    p.rotate(-0.78539816339);

    // ghost
    p.fill(255, 75, 75);
    p.rect(325, 15, 270, 270, 999, 999, 0, 0);

    p.fill(255);
    p.circle(400, 150, 75);
    p.circle(517, 150, 75);

    p.fill(50, 50, 255);
    p.circle(400, 150, 50);
    p.circle(517, 150, 50);
  };
};

var myp5 = new p5(example3, "example3");

var example4 = function (p) {
  p.setup = function () {
    p.createCanvas(400, 400);
  };

  p.draw = function () {
    p.background(0, 0, 180);

    p.strokeWeight(5);
    p.stroke(255);

    p.fill(0, 175, 0);
    p.circle(200, 200, 175);

    p.fill(250, 0, 0);

    p.beginShape();

    let origin = 200;
    for (let i = 0; i < 6; i++) {
      let x = 200 + p.sin(((p.PI * 2) / 5) * i) * 90;
      let y = 200 - p.cos(((p.PI * 2) / 5) * i) * 90;
      p.vertex(x, y);

      let offset = 3;
      let x2 = 200 - p.sin(((p.PI * 2) / 5) * (i + offset)) * 40;
      let y2 = 200 + p.cos(((p.PI * 2) / 5) * (i + offset)) * 40;
      p.vertex(x2, y2);
    }

    p.endShape();
  };
};

var myp5 = new p5(example4, "example4");

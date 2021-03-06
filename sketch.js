// https://trent-magill.github.io/csc-2463/
console.log('Version 3');

// SERIAL
let serialPDM;
let portName = "COM3";
let serialDistance = 0;

// GLOBAL 
var screenX = 640;
var screenY = 480;

var RatsSheet, rats, dungeonGround;
var timer = 0;
var finalTime = 0;
var score = 0;
var start = true;
var playerSheet;
var playerX = 0;
var playerY = 0;

// TONEJS
const clickGain = new Tone.Gain(.05);
clickGain.toMaster();
const membraneSynth = new Tone.MembraneSynth()
membraneSynth.connect(clickGain);
const membraneSynth2 = new Tone.MembraneSynth()
membraneSynth2.connect(clickGain);

const duoGain = new Tone.Gain(.03);
duoGain.toMaster();
const duoSynth = new Tone.DuoSynth();
duoSynth.connect(duoGain);

const synthGain = new Tone.Gain(.01)
synthGain.toMaster();
const synth = new Tone.Synth();
synth.oscillator.type = 'sine';
synth.connect(synthGain);
const synthGain2 = new Tone.Gain(.02)
synthGain2.toMaster();
const synth2 = new Tone.Synth();
synth2.oscillator.type = 'sine';
synth2.connect(synthGain2);

notesIndex = 0;
const notes = ['C2', 'E2', 'G2', 'B2', 'C3', 'G2', 'B2', 'G2']
const notesHigher = ['C4', 'E5', 'G4', 'B4', 'C5', 'G5', 'B4', 'G4']
const notesGame = ['C4', 'B4', 'G5', 'E4', 'G5', 'B5', 'C4', 'B4', 'G5']

Tone.Transport.scheduleRepeat(time => { eigth(time) }, '8n')
function eigth(time) {
  let trueIndex = notesIndex % notes.length;
  if (start) {
    if ([0, 1, 3, 5, 6].includes(trueIndex)) {
      let note = notesHigher[trueIndex];
      let note2 = notes[trueIndex];
      synth.triggerAttackRelease(note, '8n', time);
      synth2.triggerAttackRelease(note2, '8n', time);
    }

  } else if (timer > 0) {
    let note = notesGame[trueIndex];
    synth.triggerAttackRelease(note, '8n', time);

    if (timer < 5) {
      synth2.triggerAttackRelease('C6', '8n', time);

    }
  }

  notesIndex++;

}

Tone.Transport.scheduleRepeat(time => { whole(time) }, '1n')
function whole(time) {
  let trueIndex = notesIndex % notes.length;

  if (start) {
    let note = notes[trueIndex];
    duoSynth.triggerAttackRelease(note, '1n', time);

  } else if (timer > 0) {
    let note = notes[trueIndex];
    duoSynth.triggerAttackRelease(note, '8n', time);

  } else {
    let note = notesHigher[trueIndex];
    duoSynth.triggerAttackRelease(note, '1n', time);

  }

  notesIndex++;
}

Tone.Transport.start();

// P5JS
function preload() {
  Tone.Transport.start();
  getAudioContext().resume();

  RatsSheet = loadImage("Bug-Sheet.png");
  playerSheet = loadImage("crosshair.png");
  dungeonGround = loadImage("dungeon_ground.png");
}

function setup() {
  serialPDM = new PDMSerial(portName);
  Tone.Transport.start();
  getAudioContext().resume();

  createCanvas(screenX, screenY);
  imageMode(CENTER);

  rats = []
  startButton = new StartButton();
  crossHair = new CrossHair();

}

function draw() {
  serialDistance = serialPDM.sensorData.a0
  Tone.Transport.start();
  getAudioContext().resume();
  textSize(32);
  imageMode(CORNER)
  background(dungeonGround);
  imageMode(CENTER)

  if (start) {
    Tone.Transport.bpm.value = 120;
    fill(255)
    textStyle(BOLD)
    textSize(50)
    text("RAT AVOIDER 2000", 80, 150);
    textStyle(NORMAL)
    textSize(32)
    text("by Trent", 250, 190);
    startButton.draw();

  } else {
    if (timer > 0) {
      imageMode(CORNERS);
      noSmooth();
      image(dungeonGround, 0, 0, 256, 256);
      image(dungeonGround, 256, 256, 512, 512);
      image(dungeonGround, 256, 0, 512, 256);
      image(dungeonGround, 0, 256, 256, 512);
      smooth();
      imageMode(CENTER)
      rats.forEach(bug => bug.step());

      crossHair.step();

      // timer
      if (frameCount % 60 === 0) timer--

      // score
      line(512, 0, 512, 512);
      textSize(24)
      textStyle(BOLD)
      text("TIME: " + timer, 525, 30);
      textStyle(NORMAL)
      text("Score: " + score, 525, 60);
      text("Rats: " + rats.length, 525, 90);
    } else {
      // end
      Tone.Transport.bpm.value = 120;
      textStyle(BOLD)
      textSize(50)

      text("GAME OVER", 150, 120);
      textStyle(NORMAL)
      textSize(32)

      text("You survived for " + finalTime + " seconds", 120, 160);
      text("Rats avoided: " + rats.length, 200, 230);
      text("Final score: " + score, 200, 260);

      text("TRY AGAIN?", 210, 330)

      startButton.draw();
    }

  }

}

function mousePressed() {
  // there is no godly reason why this should be necessary, but the music doesnt work without this if statement in place
  if (start) {
    membraneSynth.triggerAttackRelease("C1", "4n")
  }

  startButton.click(mouseX, mouseY)
}

// BUG
class Bug {
  constructor(missDetect) {
    this.x = 500
    this.y = random(50, screenY - 50)
    this.frame = 0;
    this.scaleY = 1;

    this.dead = false;
    this.moveSpeedX = random(-3, -2);
    this.moveSpeedY = random(-1, 1);
    this.missDetect = missDetect;
  }

  move() {
    if (this.dead) return;

    this.x += this.moveSpeedX;
    this.y += this.moveSpeedY;

    // update movespeed
    if (this.x < -20) {
      this.x = 500
      score++;

      if (this.missDetect) rats.push(new Bug())
    }

    if (this.y < 0 || this.y > screenY) this.moveSpeedY *= -1;

    if (abs(this.x - playerX) < 20) {
      if (abs(this.y - playerY) < 20) {
        crossHair.die();
      }

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
    image(RatsSheet, 0, 0, 16, 16, this.frame * 16, 0, 16);

    pop();
  }

  step() {
    this.move();
    this.draw();
  }
}

// START BUTTON
class StartButton {
  click(mouseX, mouseY) {

    if (timer > 0) return;
    if (mouseX > 240 && mouseX < 365 && mouseY > 350 && mouseY < 400) {
      start = false;
      timer = 30;
      score = 0;
      rats = [new Bug(true)]
      Tone.Transport.bpm.rampTo(150, 30);
    }
  }

  draw() {
    // draw
    push();

    translate(240, 350)
    stroke(255)
    text("START", 11, 36);
    noFill();
    rect(0, 0, 125, 50);


    pop();
  }

}

// CROSSHAIR
class CrossHair {
  constructor() {
    this.x = 50;
    this.y = 240;
  }

  step() {
    // update the position
    let targetY = constrain(serialDistance, 3, 30) * 15;
    this.y += (targetY - this.y) * .1;

    playerX = this.x;
    playerY = this.y;

    // draw it
    push();

    translate(this.x, this.y);
    scale(3, 3);
    noSmooth();
    image(playerSheet, 0, 0, 16, 16, this.frame * 16, 0, 16);

    pop();
  }

  die() {
    serialPDM.transmit('kill', 1);
    membraneSynth.triggerAttackRelease("B4", "4n")
    membraneSynth2.triggerAttackRelease("C5", "8n")

    finalTime = 30 - timer;
    timer = 0;
  }
}
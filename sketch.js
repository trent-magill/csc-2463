// https://trent-magill.github.io/csc-2463/

// GLOBAL 
var screenX = 640;
var screenY = 480;

var BugSheet, bugs;
var timer = 0;
var score = 0;
var start = true;

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

  BugSheet = loadImage("Bug-Sheet.png");
}

function setup() {
  Tone.Transport.start();
  getAudioContext().resume();

  createCanvas(screenX, screenY);
  imageMode(CENTER);

  bugs = [new Bug(true), new Bug(false), new Bug(false)]
  startButton = new StartButton();

}

function draw() {
  Tone.Transport.start();
  getAudioContext().resume();
  textSize(32);
  background(225, 225, 255);

  if (start) {
    Tone.Transport.bpm.value = 120;
    text("BUG SQUISH GAME", 10, 30);
    text("MADE BY TRENT MAGILL", 10, 60);
    startButton.draw();
  } else {
    if (timer > 0) {
      // bugs
      bugs.forEach(bug => bug.step());

      // timer
      if (frameCount % 60 === 0) timer--

      // score
      text("Time: " + timer, 10, 30);
      text("Score: " + score, 10, 60);
    } else {
      // end
      Tone.Transport.bpm.value = 120;
      text("GAME OVER", 10, 30);
      text("Final score: " + score, 10, 60);
      startButton.draw();
    }

  }

}

function mousePressed() {
  // there is no godly reason why this should be necessary, but the music doesnt work without this if statement in place
  if (start) {
    membraneSynth.triggerAttackRelease("C1", "4n")
  }

  bugs.forEach(bug => bug.click(mouseX, mouseY))
  startButton.click(mouseX, mouseY)
}

// BUG
class Bug {
  constructor(missDetect) {
    this.x = random(50, screenX - 50)
    this.y = random(50, screenY - 50)
    this.frame = 0;
    this.scaleY = 1;

    this.dead = false;
    this.moveSpeedX = random(-2, 2);
    this.moveSpeedY = random(-1, 1);
    this.missDetect = missDetect;
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
    if (timer < 1) return;

    if (this.missDetect === true) {
      membraneSynth.triggerAttackRelease("C3", "4n")
      membraneSynth2.triggerAttackRelease("C2", "8n")
    }

    if (this.dead) return;

    let distance = dist(this.x, this.y, mouseX, mouseY);
    if (distance < 25) {
      // die
      membraneSynth.triggerAttackRelease("B4", "4n")
      membraneSynth2.triggerAttackRelease("C5", "8n")

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

// START BUTTON
class StartButton {
  click(mouseX, mouseY) {

    if (timer > 0) return;
    if (mouseX > 160 && mouseX < 460 && mouseY > 220 && mouseY < 270) {
      start = false;
      timer = 30;
      score = 0;
      bugs = [new Bug(true), new Bug(false), new Bug(false)]
      Tone.Transport.bpm.rampTo(150, 30);
    }
  }

  draw() {
    // draw
    push();

    translate(160, 220)
    rect(0, 0, 300, 50);
    text("START THE GAME", 11, 36);


    pop();
  }

}
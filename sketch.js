let cat1, cat2, currentImage;

function preload() {
  cat1 = loadImage('cat1.png')
  cat2 = loadImage('cat2.png')
  currentImage = cat1;
}

function setup() {
  createCanvas(500, 500);
  background(225);
}

function draw() {
  getAudioContext().resume();
  Tone.Transport.start();
  autoFilter.start();
  imageMode(CENTER);

  image(currentImage, 250, 250)
  text('click', 250, 250);
}


function mousePressed() {
  currentImage = cat2;
  noiseSynth.triggerAttackRelease("C2", "4n")
  noiseSynth2.triggerAttackRelease("C4", "8n")
}

function mouseReleased() {
  currentImage = cat1;
}


const plucky = new Tone.DuoSynth();
const gain0 = new Tone.Gain(.03);
gain0.toMaster();
plucky.connect(gain0);

const synth = new Tone.Synth();
synth.oscillator.type = 'sine';
const gain = new Tone.Gain(.025)
gain.toMaster();
synth.connect(gain);

const noise = new Tone.Noise("pink").start();
const autoFilter = new Tone.AutoFilter({ frequency: "2m", baseFrequency: 20, octaves: 8 })
noise.connect(autoFilter);
const gain2 = new Tone.Gain(.005);
autoFilter.connect(gain2);
gain2.toMaster();

const noiseSynth = new Tone.MembraneSynth()
const gain3 = new Tone.Gain(.1);
noiseSynth.connect(gain3);

const noiseSynth2 = new Tone.MembraneSynth()
noiseSynth2.connect(gain3);

gain3.toMaster();

const notes = ['C2', 'E2', 'G2', 'B2']
const notes2 = ['A4', 'C4', 'E4', 'G4']
var index = 0;
var index2 = 0;

Tone.Transport.scheduleRepeat(time => { repeat(time) }, '8n')
function repeat(time) {
  let note = notes[index % notes.length];
  synth.triggerAttackRelease(note, '8n', time);
  index++;

}

Tone.Transport.scheduleRepeat(time => { repeat2(time) }, '1n')
function repeat2(time) {
  let note = notes2[index2 % notes2.length];
  plucky.triggerAttackRelease(note, '8n');
  index2++;
}

Tone.Transport.start();


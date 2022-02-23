var sample1 = new Tone.Player("sample1.ogg");
var sample2 = new Tone.Player("sample2.ogg");
var sample3 = new Tone.Player("sample3.ogg");
var sample4 = new Tone.Player("sample4.ogg");
let sliderValue;

sample1.toMaster();
sample2.toMaster();
sample3.toMaster();
sample4.toMaster();

const distortion = new Tone.Distortion(0);
distortion.toMaster();
sample1.connect(distortion);
sample2.connect(distortion);
sample3.connect(distortion);
sample4.connect(distortion);


function setup() {
  textSize(16);
  text('Distortion', 10, 90);

  slider = createSlider(0, 1, 0, .1)

  button1 = createButton("Sample 1 (Sand)", "Sample 1");
  button1.mousePressed(playSample1);

  button1 = createButton("Sample 2 (Door)", "Sample 2");
  button1.mousePressed(playSample2);

  button1 = createButton("Sample 3 (Glass)", "Sample 3");
  button1.mousePressed(playSample3);

  button1 = createButton("Sample 4 (Exp)", "Sample 4");
  button1.mousePressed(playSample4);


}


function draw() {
  getAudioContext().resume();
  sliderValue = slider.value();
  distortion.set({ distortion: sliderValue })
}
// ??? TONE.JS JANK...
function playSample1() {
  sample1.start();
}

function playSample2() {
  sample2.start();
}

function playSample3() {
  sample3.start();
}

function playSample4() {
  sample4.start();
}
// VIDEO: https://streamable.com/5dqvlz

const pingPong = new Tone.PingPongDelay("64n", .1);
const drum = new Tone.MembraneSynth().connect(pingPong);
pingPong.toMaster();
drum.toMaster();

let volume, effect;

function setup() {
  text('Slider 1: Volume', 10, 70);
  text('Slider 2: Effect', 10, 90);

  sliderVolume = createSlider(-64, -32, -32, 1);

  sliderEffect = createSlider(0, 1, 0, .1)

}

function draw() {
  getAudioContext().resume();

  volume = sliderVolume.value();
  effect = sliderEffect.value();

  drum.set({
    volume: volume,
  });
  pingPong.set({ delayTime: effect })
}

function keyTyped() {
  if (key === 'z') {
    drum.triggerAttackRelease("C4", "32n");

  } else if (key === 's') {
    drum.triggerAttackRelease("C#4", "32n");
  } else if (key === 'x') {
    drum.triggerAttackRelease("D4", "32n");
  } else if (key === 'd') {
    drum.triggerAttackRelease("D#4", "32n");
  } else if (key === 'c') {
    drum.triggerAttackRelease("E4", "32n");
  } else if (key === 'v') {
    drum.triggerAttackRelease("F4", "32n");
  } else if (key === 'g') {
    drum.triggerAttackRelease("F#4", "32n");
  } else if (key === 'b') {
    drum.triggerAttackRelease("G4", "32n");
  } else if (key === 'h') {
    drum.triggerAttackRelease("G#4", "32n");
  } else if (key === 'n') {
    drum.triggerAttackRelease("A4", "32n");
  } else if (key === 'j') {
    drum.triggerAttackRelease("A#4", "32n");
  } else if (key === 'm') {
    drum.triggerAttackRelease("B4", "32n");
  } else if (key === ',') {
    drum.triggerAttackRelease("C5", "32n");
  }
}
let ctx: AudioContext | null = null;

function getCtx(): AudioContext {
  if (!ctx) {
    ctx = new AudioContext();
  }
  return ctx;
}

export function resumeAudio() {
  const c = getCtx();
  if (c.state === "suspended") c.resume();
}

function playTone(
  freq: number,
  endFreq: number,
  duration: number,
  type: OscillatorType = "sine",
  volume = 0.25,
) {
  const c = getCtx();
  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, c.currentTime);
  osc.frequency.linearRampToValueAtTime(endFreq, c.currentTime + duration);
  gain.gain.setValueAtTime(volume, c.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + duration);
  osc.connect(gain).connect(c.destination);
  osc.start(c.currentTime);
  osc.stop(c.currentTime + duration);
}

function playNoise(duration: number, volume = 0.1) {
  const c = getCtx();
  const bufferSize = c.sampleRate * duration;
  const buffer = c.createBuffer(1, bufferSize, c.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }
  const source = c.createBufferSource();
  source.buffer = buffer;
  const gain = c.createGain();
  gain.gain.setValueAtTime(volume, c.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + duration);
  const filter = c.createBiquadFilter();
  filter.type = "highpass";
  filter.frequency.value = 2000;
  source.connect(filter).connect(gain).connect(c.destination);
  source.start(c.currentTime);
}

export function playMove() {
  playTone(300, 500, 0.08, "sine", 0.15);
}

export function playGrass() {
  playNoise(0.12, 0.08);
}

export function playBlocked() {
  playTone(120, 80, 0.2, "triangle", 0.2);
}

export function playVictory() {
  const notes = [523, 659, 784, 1047]; // C5 E5 G5 C6
  notes.forEach((freq, i) => {
    setTimeout(() => playTone(freq, freq, 0.18, "sine", 0.3), i * 150);
  });
  // 撒花音效
  setTimeout(() => {
    playTone(1047, 1319, 0.4, "sine", 0.2);
    playNoise(0.3, 0.06);
  }, 600);
}

export function playOpening() {
  const notes = [392, 523, 659, 784, 659, 523]; // G4 C5 E5 G5 E5 C5
  notes.forEach((freq, i) => {
    setTimeout(() => playTone(freq, freq, 0.22, "sine", 0.22), i * 200);
  });
}

export function playVictoryJingle() {
  // 通关动画专用：钟声
  const bellNotes = [784, 988, 1175, 1319];
  bellNotes.forEach((freq, i) => {
    setTimeout(() => playTone(freq, freq, 0.5, "triangle", 0.25), i * 250);
  });
}

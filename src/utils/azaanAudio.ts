// Web Audio API synthesizer for Loud Azaan call, reminder chimes, and tactile Tasbeeh feedback

let activeAudioCtx: AudioContext | null = null;
let stopCurrentSequence: (() => void) | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  const AudioCtx =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioCtx) return null;
  if (!activeAudioCtx || activeAudioCtx.state === 'closed') {
    activeAudioCtx = new AudioCtx();
  }
  if (activeAudioCtx.state === 'suspended') {
    void activeAudioCtx.resume();
  }
  return activeAudioCtx;
}

export function stopAzaanAudio() {
  if (stopCurrentSequence) {
    stopCurrentSequence();
    stopCurrentSequence = null;
  }
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}

/**
 * Plays a rich, loud, resonant Maqam Hijaz Azaan cadence via Web Audio API
 * followed by a crisp spoken prayer announcement if SpeechSynthesis is supported.
 */
export function playLoudAzaan(
  prayerLabel: string,
  volumePercent = 90,
  onEnded?: () => void,
): void {
  stopAzaanAudio();
  const ctx = getAudioContext();
  if (!ctx) {
    onEnded?.();
    return;
  }

  const gainLevel = Math.max(0.1, Math.min(1.0, volumePercent / 100));
  const masterGain = ctx.createGain();
  masterGain.gain.setValueAtTime(gainLevel, ctx.currentTime);
  masterGain.connect(ctx.destination);

  // Maqam Hijaz inspired frequencies (D4, Eb4, F#4, G4, A4, Bb4, C#5, D5)
  const melody: Array<{ freq: number; start: number; dur: number }> = [
    // "Allahu Akbar, Allahu Akbar"
    { freq: 293.66, start: 0.0, dur: 0.65 },
    { freq: 311.13, start: 0.7, dur: 0.45 },
    { freq: 369.99, start: 1.2, dur: 0.85 },
    { freq: 392.0, start: 2.1, dur: 1.15 },
    // Second phrase
    { freq: 440.0, start: 3.55, dur: 0.65 },
    { freq: 392.0, start: 4.25, dur: 0.55 },
    { freq: 369.99, start: 4.85, dur: 0.75 },
    { freq: 311.13, start: 5.65, dur: 0.55 },
    { freq: 293.66, start: 6.25, dur: 1.45 },
    // "Hayya 'alas-Salah"
    { freq: 369.99, start: 8.0, dur: 0.6 },
    { freq: 392.0, start: 8.65, dur: 0.6 },
    { freq: 440.0, start: 9.3, dur: 1.2 },
    { freq: 392.0, start: 10.6, dur: 0.5 },
    { freq: 369.99, start: 11.15, dur: 0.9 },
    { freq: 293.66, start: 12.1, dur: 1.6 },
  ];

  const oscs: OscillatorNode[] = [];
  const baseTime = ctx.currentTime + 0.05;

  for (const note of melody) {
    const osc = ctx.createOscillator();
    const harmonic = ctx.createOscillator();
    const noteGain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(note.freq, baseTime + note.start);

    harmonic.type = 'sine';
    harmonic.frequency.setValueAtTime(note.freq * 2, baseTime + note.start);

    const harmonicGain = ctx.createGain();
    harmonicGain.gain.setValueAtTime(0.22, baseTime + note.start);

    noteGain.gain.setValueAtTime(0.001, baseTime + note.start);
    noteGain.gain.exponentialRampToValueAtTime(0.55, baseTime + note.start + 0.08);
    noteGain.gain.setValueAtTime(0.5, baseTime + note.start + note.dur * 0.72);
    noteGain.gain.exponentialRampToValueAtTime(0.001, baseTime + note.start + note.dur);

    osc.connect(noteGain);
    harmonic.connect(harmonicGain);
    harmonicGain.connect(noteGain);
    noteGain.connect(masterGain);

    osc.start(baseTime + note.start);
    harmonic.start(baseTime + note.start);
    osc.stop(baseTime + note.start + note.dur + 0.05);
    harmonic.stop(baseTime + note.start + note.dur + 0.05);

    oscs.push(osc, harmonic);
  }

  let cancelled = false;
  const endTimer = window.setTimeout(() => {
    if (cancelled) return;
    if ('speechSynthesis' in window) {
      const utter = new SpeechSynthesisUtterance(
        `Allahu Akbar. Time for ${prayerLabel}. Hayya alas-Salah.`,
      );
      utter.volume = Math.max(0.2, gainLevel);
      utter.rate = 0.88;
      utter.onend = () => onEnded?.();
      window.speechSynthesis.speak(utter);
    } else {
      onEnded?.();
    }
  }, 13900);

  stopCurrentSequence = () => {
    cancelled = true;
    window.clearTimeout(endTimer);
    for (const osc of oscs) {
      try {
        osc.stop();
      } catch {
        // already stopped
      }
    }
  };
}

export function playSoftReminderChime(volumePercent = 80): void {
  const ctx = getAudioContext();
  if (!ctx) return;
  const gainLevel = Math.max(0.08, Math.min(0.85, (volumePercent / 100) * 0.6));
  const now = ctx.currentTime + 0.02;

  [523.25, 659.25, 783.99].forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now + idx * 0.18);
    g.gain.setValueAtTime(0.001, now + idx * 0.18);
    g.gain.exponentialRampToValueAtTime(gainLevel, now + idx * 0.18 + 0.04);
    g.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.18 + 0.7);
    osc.connect(g);
    g.connect(ctx.destination);
    osc.start(now + idx * 0.18);
    osc.stop(now + idx * 0.18 + 0.75);
  });
}

export function playTasbeehTick(): void {
  const ctx = getAudioContext();
  if (!ctx) return;
  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(880, now);
  osc.frequency.exponentialRampToValueAtTime(440, now + 0.035);
  g.gain.setValueAtTime(0.12, now);
  g.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
  osc.connect(g);
  g.connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 0.045);
}

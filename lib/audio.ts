// Web Audio API Procedural Synthesizer for 3D Archipelago Portfolio
// Zero external audio files needed; instantaneous response and dynamic pitch modulation.

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = true;
  private ambientOsc1: OscillatorNode | null = null;
  private ambientOsc2: OscillatorNode | null = null;
  private ambientGain: GainNode | null = null;
  private engineOsc: OscillatorNode | null = null;
  private engineGain: GainNode | null = null;

  constructor() {
    // AudioContext will be initialized on first user interaction to comply with browser policies
  }

  private initContext() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public toggleMute(): boolean {
    this.initContext();
    this.isMuted = !this.isMuted;

    if (!this.isMuted) {
      this.startAmbient();
      this.startEngineHum();
    } else {
      this.stopAmbient();
      this.stopEngineHum();
    }

    return this.isMuted;
  }

  public setMuted(muted: boolean) {
    if (this.isMuted === muted) return;
    this.toggleMute();
  }

  private startAmbient() {
    if (!this.ctx || this.isMuted) return;

    try {
      // Warm ethereal ambient drone chord (F# minor / A major pentatonic)
      const now = this.ctx.currentTime;
      this.ambientGain = this.ctx.createGain();
      this.ambientGain.gain.setValueAtTime(0.001, now);
      this.ambientGain.gain.exponentialRampToValueAtTime(0.08, now + 3);

      const filter = this.ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(320, now);

      this.ambientOsc1 = this.ctx.createOscillator();
      this.ambientOsc1.type = "sine";
      this.ambientOsc1.frequency.setValueAtTime(146.83, now); // D3

      this.ambientOsc2 = this.ctx.createOscillator();
      this.ambientOsc2.type = "triangle";
      this.ambientOsc2.frequency.setValueAtTime(220.0, now); // A3

      this.ambientOsc1.connect(filter);
      this.ambientOsc2.connect(filter);
      filter.connect(this.ambientGain);
      this.ambientGain.connect(this.ctx.destination);

      this.ambientOsc1.start();
      this.ambientOsc2.start();
    } catch {
      // Audio autoplay policy fallback
    }
  }

  private stopAmbient() {
    if (this.ambientGain && this.ctx) {
      try {
        this.ambientGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.5);
        setTimeout(() => {
          this.ambientOsc1?.stop();
          this.ambientOsc2?.stop();
          this.ambientOsc1 = null;
          this.ambientOsc2 = null;
        }, 500);
      } catch {
        // Safe tear-down
      }
    }
  }

  private startEngineHum() {
    if (!this.ctx || this.isMuted) return;

    try {
      const now = this.ctx.currentTime;
      this.engineGain = this.ctx.createGain();
      this.engineGain.gain.setValueAtTime(0.001, now);
      this.engineGain.gain.exponentialRampToValueAtTime(0.03, now + 1);

      this.engineOsc = this.ctx.createOscillator();
      this.engineOsc.type = "sawtooth";
      this.engineOsc.frequency.setValueAtTime(75, now);

      const filter = this.ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(160, now);

      this.engineOsc.connect(filter);
      filter.connect(this.engineGain);
      this.engineGain.connect(this.ctx.destination);

      this.engineOsc.start();
    } catch {
      // Handle context limitations
    }
  }

  private stopEngineHum() {
    if (this.engineGain && this.ctx) {
      try {
        this.engineGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.2);
        setTimeout(() => {
          this.engineOsc?.stop();
          this.engineOsc = null;
        }, 200);
      } catch {
        // Safe tear-down
      }
    }
  }

  // Modulate engine pitch based on speed (normalized 0 to 1)
  public updateEngine(speedNormalized: number, isBoosting: boolean) {
    if (!this.ctx || !this.engineOsc || this.isMuted) return;

    try {
      const baseFreq = isBoosting ? 130 : 75;
      const targetFreq = baseFreq + speedNormalized * 90;
      this.engineOsc.frequency.setTargetAtTime(targetFreq, this.ctx.currentTime, 0.1);
    } catch {
      // Ignore audio glitch on frame drops
    }
  }

  // Play crystal pickup / chime effect
  public playChime(freqMultiplier = 1) {
    if (!this.ctx || this.isMuted) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(587.33 * freqMultiplier, now); // D5
      osc.frequency.exponentialRampToValueAtTime(880 * freqMultiplier, now + 0.15); // A5

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.6);
    } catch {
      // Ignore
    }
  }

  // Play kiosk interact modal tone
  public playKioskOpen() {
    if (!this.ctx || this.isMuted) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(330, now);
      osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.2);

      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.5);
    } catch {
      // Ignore
    }
  }

  // Play teleport / boost burst whoosh
  public playWhoosh() {
    if (!this.ctx || this.isMuted) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = "sine";
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.exponentialRampToValueAtTime(50, now + 0.4);

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(800, now);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.4);
    } catch {
      // Ignore
    }
  }
}

export const soundEngine = new SoundEngine();

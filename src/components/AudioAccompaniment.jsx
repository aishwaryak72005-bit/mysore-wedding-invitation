import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music, Flower2 } from 'lucide-react';

export default function AudioAccompaniment({ autoPlayTrigger }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioCtxRef = useRef(null);
  const nodesRef = useRef([]);

  // Initialize Web Audio API synthetic tanpura & royal bells ambience
  const initAudio = () => {
    if (audioCtxRef.current) return;

    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      // Master Gain
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
      masterGain.connect(ctx.destination);

      // Low Tanpura fundamental Sa (C3 ~ 130.81 Hz)
      const oscSa1 = ctx.createOscillator();
      oscSa1.type = 'sawtooth';
      oscSa1.frequency.setValueAtTime(130.81, ctx.currentTime);

      const filterSa1 = ctx.createBiquadFilter();
      filterSa1.type = 'lowpass';
      filterSa1.frequency.setValueAtTime(420, ctx.currentTime);

      const gainSa1 = ctx.createGain();
      gainSa1.gain.setValueAtTime(0.12, ctx.currentTime);

      oscSa1.connect(filterSa1);
      filterSa1.connect(gainSa1);
      gainSa1.connect(masterGain);
      oscSa1.start();

      // Tanpura Pa (G3 ~ 196.00 Hz)
      const oscPa = ctx.createOscillator();
      oscPa.type = 'sawtooth';
      oscPa.frequency.setValueAtTime(196.00, ctx.currentTime);

      const filterPa = ctx.createBiquadFilter();
      filterPa.type = 'lowpass';
      filterPa.frequency.setValueAtTime(500, ctx.currentTime);

      const gainPa = ctx.createGain();
      gainPa.gain.setValueAtTime(0.08, ctx.currentTime);

      oscPa.connect(filterPa);
      filterPa.connect(gainPa);
      gainPa.connect(masterGain);
      oscPa.start();

      // Tanpura High Sa (C4 ~ 261.63 Hz)
      const oscSa2 = ctx.createOscillator();
      oscSa2.type = 'sine';
      oscSa2.frequency.setValueAtTime(261.63, ctx.currentTime);

      const gainSa2 = ctx.createGain();
      gainSa2.gain.setValueAtTime(0.06, ctx.currentTime);

      oscSa2.connect(gainSa2);
      gainSa2.connect(masterGain);
      oscSa2.start();

      // LFO for slow meditative breathing shimmer
      const lfo = ctx.createOscillator();
      lfo.frequency.setValueAtTime(0.2, ctx.currentTime); // 5-second cycle
      const lfoGain = ctx.createGain();
      lfoGain.gain.setValueAtTime(0.04, ctx.currentTime);
      lfo.connect(lfoGain);
      lfoGain.connect(masterGain.gain);
      lfo.start();

      // Temple chime generator every few seconds
      const chimeInterval = setInterval(() => {
        if (!audioCtxRef.current || audioCtxRef.current.state !== 'running') return;
        playTempleChime(ctx, masterGain);
      }, 7000);

      nodesRef.current = [masterGain, oscSa1, oscPa, oscSa2, lfo, chimeInterval];
    } catch (e) {
      console.warn("Web Audio not supported or blocked", e);
    }
  };

  const playTempleChime = (ctx, destination) => {
    try {
      const chimeOsc = ctx.createOscillator();
      const chimeGain = ctx.createGain();
      chimeOsc.type = 'sine';
      // Pentatonic royal chime note (E5 ~ 659.25 Hz or G5 ~ 783.99 Hz)
      const notes = [659.25, 783.99, 1046.50];
      const freq = notes[Math.floor(Math.random() * notes.length)];
      chimeOsc.frequency.setValueAtTime(freq, ctx.currentTime);

      chimeGain.gain.setValueAtTime(0.001, ctx.currentTime);
      chimeGain.gain.exponentialRampToValueAtTime(0.04, ctx.currentTime + 0.05);
      chimeGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 3.5);

      chimeOsc.connect(chimeGain);
      chimeGain.connect(destination);
      chimeOsc.start();
      chimeOsc.stop(ctx.currentTime + 3.6);
    } catch (err) {
      // safe ignore
    }
  };

  const startMusic = () => {
    initAudio();
    if (audioCtxRef.current) {
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }
      const masterGain = nodesRef.current[0];
      if (masterGain) {
        masterGain.gain.cancelScheduledValues(audioCtxRef.current.currentTime);
        masterGain.gain.linearRampToValueAtTime(0.25, audioCtxRef.current.currentTime + 2);
      }
      setIsPlaying(true);
      setHasInteracted(true);
    }
  };

  const stopMusic = () => {
    if (audioCtxRef.current && nodesRef.current[0]) {
      const masterGain = nodesRef.current[0];
      masterGain.gain.cancelScheduledValues(audioCtxRef.current.currentTime);
      masterGain.gain.linearRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + 0.8);
      setTimeout(() => {
        setIsPlaying(false);
      }, 800);
    } else {
      setIsPlaying(false);
    }
  };

  const toggleMusic = () => {
    if (isPlaying) {
      stopMusic();
    } else {
      startMusic();
    }
  };

  // Listen to global toggle-royal-music event from UnifiedCinematicController
  useEffect(() => {
    const handleToggle = (e) => {
      if (e.detail && typeof e.detail.mute === 'boolean') {
        if (e.detail.mute) {
          stopMusic();
        } else {
          startMusic();
        }
      } else {
        toggleMusic();
      }
    };

    window.addEventListener('toggle-royal-music', handleToggle);
    return () => window.removeEventListener('toggle-royal-music', handleToggle);
  }, [isPlaying]);

  // Trigger when envelope is opened
  useEffect(() => {
    if (autoPlayTrigger && !hasInteracted && !isPlaying) {
      startMusic();
    }
  }, [autoPlayTrigger]);

  useEffect(() => {
    return () => {
      if (nodesRef.current[5]) clearInterval(nodesRef.current[5]);
      if (audioCtxRef.current) audioCtxRef.current.close();
    };
  }, []);

  // Controls are elegantly integrated into UnifiedCinematicController at the top
  return null;
}

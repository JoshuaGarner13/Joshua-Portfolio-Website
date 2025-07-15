import { useEffect } from 'react';

// Simple sound effects using Web Audio API
export const useSoundEffects = () => {
  const audioContext = typeof window !== 'undefined' ? new (window.AudioContext || (window as any).webkitAudioContext)() : null;

  const playTone = (frequency: number, duration: number, type: OscillatorType = 'sine') => {
    if (!audioContext) return;

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = type;

    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration);
  };

  const playHoverSound = () => playTone(800, 0.1, 'sine');
  const playClickSound = () => playTone(1000, 0.2, 'square');
  const playSuccessSound = () => {
    playTone(523, 0.15); // C
    setTimeout(() => playTone(659, 0.15), 150); // E
    setTimeout(() => playTone(784, 0.15), 300); // G
  };

  return { playHoverSound, playClickSound, playSuccessSound };
};
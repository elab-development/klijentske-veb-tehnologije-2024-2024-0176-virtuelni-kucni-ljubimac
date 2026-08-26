import React, { useState, useRef, useEffect } from 'react';
import audioFile from '../assets/zvuk/zvuk_glavno.mp3';

export default function Zvuk() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.2;
    }
  }, []);

  const toggleMusic = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.log("Ups! Došlo je do greške pri puštanju muzike!", err);
      });
    }
  };

  return (
    <div style={{ position: 'fixed', top: '15px', right: '15px', zIndex: 99999, pointerEvents: 'all' }}>
      <audio ref={audioRef} src={audioFile} loop preload="auto" />
      <button 
        type="button"
        onClick={toggleMusic}
        style={{
          backgroundColor: '#111',
          color: '#00FF66',
          border: '3px solid #000',
          padding: '8px 12px',
          fontFamily: "'VT323', monospace",
          fontSize: '18px',
          cursor: 'pointer',
          boxShadow: '3px 3px 0px #000',
          pointerEvents: 'all'
        }}
      >
        {isPlaying ? '🔊 MUZIKA: ON' : '🔈 MUZIKA: OFF'}
      </button>
    </div>
  );
}
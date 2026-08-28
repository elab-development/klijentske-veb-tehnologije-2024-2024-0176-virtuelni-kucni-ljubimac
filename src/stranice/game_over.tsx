import React from 'react';
import pozadinaGameOver from '../assets/pozadine/gameoverpozadina.jpg';
import '../stil/game_over.css';

interface GameOverProps {
  onRestart: () => void;
  onLogout: () => void;
}

export default function GameOver({ onRestart, onLogout }: GameOverProps) {
  return (
    <div
      className="game-over-container"
      style={{ backgroundImage: `url(${pozadinaGameOver})` }}
    >
      <div className="game-over-content">
        <h1 className="game-over-title">GAME OVER</h1>
        
        <p className="game-over-subtitle">Želiš li da pokušaš ponovo?</p>
        
        <div className="game-over-buttons">
          <button className="pixel-btn" onClick={onRestart}>
            DA
          </button>
          <button className="pixel-btn" onClick={onLogout}>
            NE
          </button>
        </div>
      </div>
    </div>
  );
}
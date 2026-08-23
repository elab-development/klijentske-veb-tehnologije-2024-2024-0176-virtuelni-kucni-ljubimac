import React from 'react';
import '../stil/dobrodosli.css';

interface DobrodosliProps {
  onNavigate: (screen: string) => void;
}

export default function Dobrodosli({ onNavigate }: DobrodosliProps) {
  return (
    <div className="welcome-bg">
      <div className="welcome-content">
        <h1 className="welcome-title">ZDRAVO!</h1>
        <p className="welcome-subtitle">
          TVOJ VIRTUELNI KUĆNI LJUBIMAC TE ČEKA!
        </p>

        <div className="welcome-buttons">
          <button 
            className="pixel-btn pulse-btn"
            onClick={() => onNavigate('login')}
          >
            ▶ PRIJAVI SE
          </button>
          <button 
            className="pixel-btn"
            onClick={() => onNavigate('signup')}
          >
            ✦ REGISTRUJ SE
          </button>
        </div>
      </div>
    </div>
  );
}
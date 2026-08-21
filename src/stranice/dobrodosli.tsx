//import React from 'react';

interface Props {
  onNavigate: (screen: string) => void;
}

export default function Dobrodosli({ onNavigate }: Props) {
  return (
    <div className="page-container welcome-page">
      <h1 className="pixel-title">ZDRAVO!</h1>
      <p className="pixel-subtitle">TVOJ VIRTUELNI KUĆNI LJUBIMAC TE ČEKA!</p>
      
      <button className="pixel-button" onClick={() => onNavigate('login')}>
        PRIJAVI SE
      </button>
      <button className="pixel-button" onClick={() => onNavigate('signup')}>
        REGISTRUJ SE
      </button>
    </div>
  );
}
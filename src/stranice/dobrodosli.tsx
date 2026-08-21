//import React from 'react';

interface Props {
  onNavigate: (screen: string) => void;
}

export default function Dobrodosli({ onNavigate }: Props) {
  return (
    <div className="page-container welcome-page">
      <h1 className="pixel-title">ZDRAVO!</h1>
      <h1 className="pixel-title">TVOJ VIRTUELNI KUĆNI LJUBIMAC TE ČEKA!</h1>
      
      <button className="pixel-button" onClick={() => onNavigate('Login')}>
        PRIJAVI SE
      </button>
      <button className="pixel-button" onClick={() => onNavigate('Signup')}>
        REGISTRUJ SE
      </button>
    </div>
  );
}
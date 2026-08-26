import React, { useState } from 'react';
import pozadinaSoba from '../assets/pozadine/dnevnasobaslika.png';
import '../stil/dnevna_soba.css';

interface Props {
  selectedPet: { id: string; slika: string } | null;
  petName?: string;
  happiness?: number;
  hunger?: number; // Možeš ostaviti 'hunger' ili preimenovati u 'siteness' po želji, prop oslanja na broj
  onNavigate?: (screen: string) => void;
  isMusicPlaying?: boolean;
  onToggleMusic?: () => void;
}

export default function DnevnaSoba({
  selectedPet,
  petName,
  happiness = 3,
  hunger = 3,
  onNavigate,
  isMusicPlaying = false,
  onToggleMusic,
}: Props) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="dnevna-soba-container">
      {/* GLAVNA POZADINA */}
      <div
        className="dnevna-soba-wrapper"
        style={{ backgroundImage: `url(${pozadinaSoba})` }}
      >
        {/* GORE DESNO: MUZIKA + SRCE SA OKVIROM */}
        <div className="music-control-wrapper">
          <button 
            className="music-toggle-btn" 
            onClick={onToggleMusic}
          >
            {isMusicPlaying ? 'MUZIKA: ON' : 'MUZIKA: OFF'}
          </button>

          <button className="menu-heart-trigger" onClick={() => setMenuOpen(!menuOpen)}>
            <div className="pixel-heart-shape" />
          </button>

          {menuOpen && (
            <div className="room-dropdown-menu">
              <button onClick={() => onNavigate && onNavigate('outside')}>Dvorište</button>
              <button onClick={() => onNavigate && onNavigate('choose-pet')}>Promeni ljubimca</button>
              <button onClick={() => onNavigate && onNavigate('logout')}>Odjavi se</button>
            </div>
          )}
        </div>

        {/* TV sa tekstom */}
        <div className="tv-text-box">
          <span className="tv-row">OVDE ĆE SE PRIKAZIVATI</span>
          <span className="tv-row">OBAVEŠTENJA.</span>
          <span className="tv-row">KLIKOM NA SRCE SA</span>
          <span className="tv-row">DESNE STRANE OTVARA</span>
          <span className="tv-row">SE MENI.</span>
        </div>

        {/* Ljubimac na kauču */}
        <div className="pet-on-couch">
          <span className="pet-name-label">{petName ? petName.toUpperCase() : 'MARKO'}</span>
          {selectedPet && (
            <img
              src={selectedPet.slika}
              alt="Ljubimac"
              className="couch-pixel-pet"
            />
          )}
        </div>
      </div>

      {/* Sreća i Sitost u donjem levom delu (Piksel srca) */}
      <div className="bottom-stats-container">
        <div className="stat-box">
          <span className="stat-title">SREĆA:</span>
          <div className="hearts-column">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={`hap-${i}`}
                className={`pixel-stat-heart cyan ${i < happiness ? 'full' : 'empty'}`}
              >
                <div className="heart-bg" />
                <div className="heart-inner" />
              </div>
            ))}
          </div>
        </div>

        <div className="stat-box">
          <span className="stat-title">SITOST:</span>
          <div className="hearts-column">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={`hng-${i}`}
                className={`pixel-stat-heart yellow ${i < hunger ? 'full' : 'empty'}`}
              >
                <div className="heart-bg" />
                <div className="heart-inner" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
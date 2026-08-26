import React, { useState } from 'react';
import pozadinaSoba from '../assets/pozadine/dnevnasobaslika.png';
import '../stil/dnevna_soba.css';

interface Props {
  selectedPet: { id: string; slika: string } | null;
  petName?: string;
  happiness?: number;
  hunger?: number;
  onNavigate?: (screen: string) => void;
}

export default function DnevnaSoba({
  selectedPet,
  petName,
  happiness = 3,
  hunger = 3,
  onNavigate,
}: Props) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="dnevna-soba-container">
      <div
        className="dnevna-soba-wrapper"
        style={{ backgroundImage: `url(${pozadinaSoba})` }}
      >
        {/* TV sa obaveštenjem */}
        <div className="tv-text-box">
          <span className="tv-row">OVDE ĆE SE PRIKAZIVATI</span>
          <span className="tv-row">OBAVEŠTENJA.</span>
          <span className="tv-row">KLIKOM NA SRCE SA</span>
          <span className="tv-row">DESNE STRANE OTVARA</span>
          <span className="tv-row">SE MENI.</span>
        </div>

        {/* Meni srce na polici */}
        <button className="menu-heart-trigger" onClick={() => setMenuOpen(!menuOpen)}>
          <div className="pixel-heart-shape" />
        </button>

        {/* Meni */}
        {menuOpen && (
          <div className="room-dropdown-menu">
            <button onClick={() => onNavigate && onNavigate('outside')}>Dvorište</button>
            <button onClick={() => onNavigate && onNavigate('choose-pet')}>Promeni ljubimca</button>
            <button onClick={() => onNavigate && onNavigate('logout')}>Odjavi se</button>
          </div>
        )}

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

        {/* Indikatori pri dnu */}
        <div className="bottom-stats-container">
          <div className="stat-box">
            <span className="stat-title">SREĆA:</span>
            <div className="hearts-row">
              {Array.from({ length: 3 }).map((_, i) => (
                <span
                  key={`hap-${i}`}
                  className={`heart-icon cyan ${i < happiness ? 'full' : 'empty'}`}
                >
                  ♥
                </span>
              ))}
            </div>
          </div>

          <div className="stat-box">
            <span className="stat-title">GLAD:</span>
            <div className="hearts-row">
              {Array.from({ length: 3 }).map((_, i) => (
                <span
                  key={`hng-${i}`}
                  className={`heart-icon yellow ${i < hunger ? 'full' : 'empty'}`}
                >
                  ♥
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
import React, { useState } from 'react';
import pozadinaSoba from '../assets/pozadine/dnevnasobaslika.png';

import srceMeni from '../assets/ikonice/roze_srce.png';
import srceSreca from '../assets/ikonice/zeleno_srce.png';
import srceSitost from '../assets/ikonice/narandzasto_srce.png';
import ikonaZatvori from '../assets/ikonice/X.png';

import '../stil/dnevna_soba.css';

interface Props {
  selectedPet: { id: string; slika: string } | null;
  petName?: string;
  happiness?: number;
  hunger?: number;
  setHappiness?: React.Dispatch<React.SetStateAction<number>>;
  setHunger?: React.Dispatch<React.SetStateAction<number>>;
  onNavigate?: (screen: string) => void;
  onFeed?: () => void;
  onSleep?: () => void;
  equippedAccessory?: string | null;
}

export default function DnevnaSoba({
  selectedPet,
  petName,
  happiness = 3,
  hunger = 3,
  setHappiness,
  setHunger,
  onNavigate,
  onFeed,
  onSleep,
  equippedAccessory,
}: Props) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="dnevna-soba-container">
      <div
        className="dnevna-soba-wrapper"
        style={{ backgroundImage: `url(${pozadinaSoba})` }}
      >
        {/* DUGBE ZA OTVARANJE MENIJA (ROZE SRCE) */}
        {!menuOpen && (
          <div className="menu-heart-wrapper">
            <button className="menu-heart-trigger" onClick={() => setMenuOpen(true)}>
              <img src={srceMeni} alt="Meni" className="heart-icon-img" />
            </button>
          </div>
        )}

        {/* SIDE PANELI / OVERLAY MENI */}
        {menuOpen && (
          <div className="side-menu-overlay">
            <button className="close-menu-btn" onClick={() => setMenuOpen(false)}>
              <img src={ikonaZatvori} alt="Zatvori" />
            </button>

            <div className="side-menu-buttons">
              <button onClick={() => { onFeed ? onFeed() : setHunger && setHunger((prev) => Math.min(prev + 1, 3)); }}>
                NAHRANI ME!
              </button>
              <button onClick={() => onNavigate && onNavigate('outside')}>
                IZAĐIMO NAPOLJE!
              </button>
              <button onClick={() => { onSleep ? onSleep() : setHappiness && setHappiness((prev) => Math.min(prev + 1, 3)); }}>
                VREME JE ZA SPAVANJE!
              </button>
            </div>

            <div className="side-menu-bottom">
              <button onClick={() => onNavigate && onNavigate('logout')}>
                IZLOGUJ SE :(
              </button>
            </div>
          </div>
        )}

        {/* TV TEKST */}
        <div className="tv-text-box">
          <span className="tv-row">OVDE ĆE SE PRIKAZIVATI</span>
          <span className="tv-row">OBAVEŠTENJA.</span>
          <span className="tv-row">KLIKOM NA SRCE SA</span>
          <span className="tv-row">DESNE STRANE OTVARA</span>
          <span className="tv-row">SE MENI.</span>
        </div>

        {/* LJUBIMAC NA KAUČU */}
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

        {/* DONJI LEVI DEO (SREĆA + SITOST) */}
        <div className="bottom-stats-container">
          <div className="stat-box">
            <span className="stat-title">SREĆA:</span>
            <div className="hearts-column">
              {Array.from({ length: happiness }).map((_, i) => (
                <img
                  key={`hap-${i}`}
                  src={srceSreca}
                  alt="Srce sreća"
                  className="stat-heart-img"
                />
              ))}
            </div>
          </div>

          <div className="stat-box">
            <span className="stat-title">SITOST:</span>
            <div className="hearts-column">
              {Array.from({ length: hunger }).map((_, i) => (
                <img
                  key={`hng-${i}`}
                  src={srceSitost}
                  alt="Srce sitost"
                  className="stat-heart-img"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
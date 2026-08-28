import React, { useState } from 'react';
import pozadinaSoba from '../assets/pozadine/dnevnasobaslika.png';

import srceMeni from '../assets/ikonice/roze_srce.png';
import srceSreca from '../assets/ikonice/zeleno_srce.png';
import srceSitost from '../assets/ikonice/narandzasto_srce.png';
import ikonaZatvori from '../assets/ikonice/X.png';

import naocare1 from '../assets/aksesoari/naocare1.png';
import naocare2 from '../assets/aksesoari/naocare2.png';
import naocareSrca from '../assets/aksesoari/naocaresrca.png';
import naocareUske from '../assets/aksesoari/naocare3.png';
import naocareCrvene from '../assets/aksesoari/naocarecrvene.png';
import leptir from '../assets/aksesoari/leptir.png';
import list from '../assets/aksesoari/list.png';
import lopta from '../assets/aksesoari/lopta.png';
import napitak from '../assets/aksesoari/napitak.png';

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
  setEquippedAccessory?: (acc: string | null) => void;
}

const AKSESOARI_MAP: Record<string, string> = {
  naocare1,
  naocare2,
  naocare_srcad: naocareSrca,
  naocare_uske: naocareUske,
  naocare_crvene: naocareCrvene,
  leptir,
  list,
  lopta,
  napitak,
};

const ROOM_ACCESSORY_OFFSETS: Record<string, Record<string, { top: string; left: string; width: string }>> = {
   zaba: {
    naocare1: { top: '25%', left: '50%', width: '105px' },
    naocare2: { top: '25%', left: '50%', width: '105px' },
    naocare_srcad: { top: '25%', left: '50%', width: '105px' },
    naocare_uske: { top: '25%', left: '50%', width: '105px' },
    naocare_crvene: { top: '25%', left: '50%', width: '110px' },
    leptir: { top: '15%', left: '50%', width: '90px' },
    list: { top: '20%', left: '50%', width: '90px' },
    lopta: { top: '65%', left: '75%', width: '100px' },
    napitak: { top: '65%', left: '25%', width: '100px' },
  },
  macka: {
    naocare1: { top: '60%', left: '40%', width: '105px' },
    naocare2: { top: '60%', left: '40%', width: '105px' },
    naocare_srcad: { top: '60%', left: '40%', width: '105px' },
    naocare_uske: { top: '60%', left: '40%', width: '105px' },
    naocare_crvene: { top: '60%', left: '40%', width: '110px' },
    leptir: { top: '40%', left: '40%', width: '90px' },
    list: { top: '40%', left: '40%', width: '90px' },
    lopta: { top: '70%', left: '70%', width: '100px' },
    napitak: { top: '70%', left: '20%', width: '100px' },
  },
  patka: {
    naocare1: { top: '26%', left: '45%', width: '115px' },
    naocare2: { top: '26%', left: '45%', width: '115px' },
    naocare_srcad: { top: '26%', left: '45%', width: '120px' },
    naocare_uske: { top: '29%', left: '45%', width: '115px' },
    naocare_crvene: { top: '28%', left: '45%', width: '125px' },
    leptir: { top: '15%', left: '45%', width: '90px' },
    list: { top: '17%', left: '45%', width: '90px' },
    lopta: { top: '70%', left: '75%', width: '100px' },
    napitak: { top: '65%', left: '25%', width: '100px' },
  },
  patak: {
    naocare1: { top: '25%', left: '50%', width: '105px' },
    naocare2: { top: '25%', left: '50%', width: '105px' },
    naocare_srcad: { top: '25%', left: '50%', width: '105px' },
    naocare_uske: { top: '25%', left: '50%', width: '105px' },
    naocare_crvene: { top: '25%', left: '50%', width: '110px' },
    leptir: { top: '15%', left: '50%', width: '90px' },
    list: { top: '20%', left: '50%', width: '90px' },
    lopta: { top: '65%', left: '75%', width: '100px' },
    napitak: { top: '65%', left: '25%', width: '100px' },
  },
  jez: {
    naocare1: { top: '40%', left: '30%', width: '105px' },
    naocare2: { top: '40%', left: '30%', width: '105px' },
    naocare_srcad: { top: '40%', left: '30%', width: '105px' },
    naocare_uske: { top: '45%', left: '30%', width: '105px' },
    naocare_crvene: { top: '40%', left: '30%', width: '110px' },
    leptir: { top: '15%', left: '50%', width: '90px' },
    list: { top: '20%', left: '50%', width: '90px' },
    lopta: { top: '15%', left: '50%', width: '100px' },
    napitak: { top: '55%', left: '70%', width: '100px' },
  },
  kornjaca: {
    naocare1: { top: '40%', left: '30%', width: '105px' },
    naocare2: { top: '40%', left: '30%', width: '105px' },
    naocare_srcad: { top: '40%', left: '30%', width: '105px' },
    naocare_uske: { top: '45%', left: '30%', width: '105px' },
    naocare_crvene: { top: '40%', left: '30%', width: '110px' },
    leptir: { top: '35%', left: '65%', width: '90px' },
    list: { top: '35%', left: '65%', width: '90px' },
    lopta: { top: '65%', left: '75%', width: '100px' },
    napitak: { top: '65%', left: '75%', width: '100px' },
  },
  ptica: {
    naocare1: { top: '45%', left: '60%', width: '120px' },
    naocare2: { top: '45%', left: '60%', width: '120px' },
    naocare_srcad: { top: '45%', left: '60%', width: '120px' },
    naocare_uske: { top: '45%', left: '60%', width: '120px' },
    naocare_crvene: { top: '45%', left: '60%', width: '125px' },
    leptir: { top: '20%', left: '50%', width: '90px' },
    list: { top: '30%', left: '55%', width: '90px' },
    lopta: { top: '85%', left: '75%', width: '100px' },
    napitak: { top: '45%', left: '5%', width: '100px' },
  },
  ribica: {
    naocare1: { top: '35%', left: '67%', width: '105px' },
    naocare2: { top: '35%', left: '67%', width: '105px' },
    naocare_srcad: { top: '35%', left: '67%', width: '105px' },
    naocare_uske: { top: '35%', left: '67%', width: '105px' },
    naocare_crvene: { top: '35%', left: '70%', width: '110px' },
    leptir: { top: '25%', left: '50%', width: '90px' },
    list: { top: '35%', left: '50%', width: '90px' },
    lopta: { top: '65%', left: '75%', width: '100px' },
    napitak: { top: '65%', left: '25%', width: '100px' },
  },
  zmija: {
    naocare1: { top: '35%', left: '30%', width: '105px' },
    naocare2: { top: '35%', left: '30%', width: '105px' },
    naocare_srcad: { top: '35%', left: '30%', width: '105px' },
    naocare_uske: { top: '37%', left: '30%', width: '105px' },
    naocare_crvene: { top: '35%', left: '30%', width: '110px' },
    leptir: { top: '25%', left: '45%', width: '90px' },
    list: { top: '25%', left: '45%', width: '90px' },
    lopta: { top: '75%', left: '75%', width: '100px' },
    napitak: { top: '75%', left: '25%', width: '100px' },
  },
};

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
  const [tvMessage, setTvMessage] = useState<string[] | null>(null);

  const handleSleepClick = () => {
    if (equippedAccessory) {
      setTvMessage([
        'SKINI AKSESOAR',
        'PRE SPAVANJA!',
        'LJUBIMAC NE MOŽE',
        'DA SPAVA SA TIM!'
      ]);
      setMenuOpen(false);
      return;
    }

    if (onSleep) {
      onSleep();
    } else if (setHappiness) {
      setHappiness((prev) => Math.min(prev + 1, 3));
      setTvMessage(['LJUBIMAC JE', 'ODMORAN I SREĆAN!']);
    }
    setMenuOpen(false);
  };

  const handleFeedClick = () => {
    if (onFeed) {
      onFeed();
    } else if (setHunger) {
      setHunger((prev) => Math.min(prev + 1, 3));
      setTvMessage(['NJAM NJAM!', 'LJUBIMAC JE NAHRANJEN.']);
    }
    setMenuOpen(false);
  };

  const petId = selectedPet?.id || 'zaba';
  const activeAccessorySrc = equippedAccessory ? AKSESOARI_MAP[equippedAccessory] : null;
  const currentOffset = equippedAccessory && ROOM_ACCESSORY_OFFSETS[petId]?.[equippedAccessory]
    ? ROOM_ACCESSORY_OFFSETS[petId][equippedAccessory]
    : { top: '35%', left: '50%', width: '70px' };

  return (
    <div className="dnevna-soba-container">
      <div
        className="dnevna-soba-wrapper"
        style={{ backgroundImage: `url(${pozadinaSoba})` }}
      >
        {!menuOpen && (
          <div className="menu-heart-wrapper">
            <button className="menu-heart-trigger" onClick={() => setMenuOpen(true)}>
              <img src={srceMeni} alt="Meni" className="heart-icon-img" />
            </button>
          </div>
        )}

        {menuOpen && (
          <div className="side-menu-overlay">
            <button className="close-menu-btn" onClick={() => setMenuOpen(false)}>
              <img src={ikonaZatvori} alt="Zatvori" />
            </button>

            <div className="side-menu-buttons">
              <button onClick={handleFeedClick}>
                NAHRANI ME!
              </button>
              <button onClick={() => onNavigate && onNavigate('outside')}>
                IZAĐIMO NAPOLJE!
              </button>
              <button onClick={handleSleepClick}>
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

        <div className="tv-text-box">
          {tvMessage ? (
            tvMessage.map((row, idx) => (
              <span key={idx} className="tv-row">{row}</span>
            ))
          ) : (
            <>
              <span className="tv-row">OVDE ĆE SE PRIKAZIVATI</span>
              <span className="tv-row">OBAVEŠTENJA.</span>
              <span className="tv-row">KLIKOM NA SRCE SA</span>
              <span className="tv-row">DESNE STRANE OTVARA</span>
              <span className="tv-row">SE MENI.</span>
            </>
          )}
        </div>

        <div className="pet-on-couch">
          <span className="pet-name-label">{petName ? petName.toUpperCase() : 'MARKO'}</span>
          <div className="pet-sprite-wrapper" style={{ position: 'relative', display: 'inline-block' }}>
            {selectedPet && (
              <img
                src={selectedPet.slika}
                alt="Ljubimac"
                className="couch-pixel-pet"
              />
            )}
            {activeAccessorySrc && (
              <img
                src={activeAccessorySrc}
                alt="Aksesoar"
                className="equipped-accessory-item"
                style={{
                  position: 'absolute',
                  top: currentOffset.top,
                  left: currentOffset.left,
                  width: currentOffset.width,
                  transform: 'translate(-50%, -50%)',
                  imageRendering: 'pixelated',
                  pointerEvents: 'none',
                  zIndex: 6,
                }}
              />
            )}
          </div>
        </div>

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
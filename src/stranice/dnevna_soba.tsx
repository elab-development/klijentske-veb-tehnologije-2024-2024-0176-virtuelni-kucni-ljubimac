import React, { useState, useEffect } from 'react';
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

// Pozicije ZZZ u odnosu na ljubimca (možeš menjati po potrebi)
const ROOM_ZZZ_OFFSETS: Record<string, { top: string; left: string }> = {
  zaba: { top: '-20px', left: '5%' },
  macka: { top: '-35px', left: '15%' },
  patka: { top: '-40px', left: '10%' },
  patak: { top: '-40px', left: '10%' },
  jez: { top: '-35px', left: '20%' },
  kornjaca: { top: '-35px', left: '20%' },
  ptica: { top: '-45px', left: '0%' },
  ribica: { top: '-35px', left: '10%' },
  zmija: { top: '-35px', left: '20%' },
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

  const [isSleeping, setIsSleeping] = useState(false);
  const [sleepTimer, setSleepTimer] = useState<number>(0);
  const [accessoryHappinessGained, setAccessoryHappinessGained] = useState<boolean>(false);

  useEffect(() => {
    if (equippedAccessory && !accessoryHappinessGained && setHappiness) {
      setHappiness((prev) => {
        if (prev < 3) {
          setAccessoryHappinessGained(true);
          return prev + 1;
        }
        return prev;
      });
    }
  }, [equippedAccessory, accessoryHappinessGained, setHappiness]);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (isSleeping && sleepTimer > 0) {
      timer = setInterval(() => {
        setSleepTimer((prev) => {
          const nextVal = prev - 1;
          if (nextVal > 0 && nextVal % 30 === 0 && setHappiness) {
            setHappiness((h) => Math.min(h + 1, 3));
          }
          return nextVal;
        });
      }, 1000);
    } else if (isSleeping && sleepTimer === 0) {
      setIsSleeping(false);
      if (setHappiness) {
        setHappiness(3);
      }
      setAccessoryHappinessGained(false);
      setTvMessage(['LJUBIMAC SE PROBUDIO!', 'SADA JE ODMORAN I SREĆAN!']);
    }

    return () => clearInterval(timer);
  }, [isSleeping, sleepTimer, setHappiness]);

  const handleSleepClick = () => {
    if (isSleeping) return;

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

    let duration = 0;
    if (happiness === 2) {
      duration = 30;
    } else if (happiness === 1) {
      duration = 60;
    } else if (happiness === 0 && hunger > 0) {
      duration = 90;
    } else if (happiness === 3) {
      setTvMessage(['LJUBIMAC NIJE UMORAN!']);
      setMenuOpen(false);
      return;
    }

    if (duration > 0) {
      setSleepTimer(duration);
      setIsSleeping(true);
      if (onSleep) onSleep();
    }

    setMenuOpen(false);
  };

  const handleFeedClick = () => {
    if (isSleeping) {
      setTvMessage(['LJUBIMAC SPAVA!', 'NE MOŽEŠ GA NAHRANITI.']);
      setMenuOpen(false);
      return;
    }

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

  const currentZzzOffset = ROOM_ZZZ_OFFSETS[petId] || { top: '-40px', left: '10%' };

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
              <button onClick={() => !isSleeping && onNavigate && onNavigate('outside')}>
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
          {isSleeping ? (
            <>
              <span className="tv-row">TVOJ LJUBIMAC SADA SPAVA!</span>
              <span className="tv-row" style={{ marginTop: '5px', color: '#ffea00' }}>
                PREOSTALO: {sleepTimer}s
              </span>
            </>
          ) : tvMessage ? (
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

          <div
            className="pet-sprite-wrapper"
            style={{
              position: 'relative',
              display: 'inline-block',
              transform: isSleeping ? 'rotate(90deg)' : 'rotate(0deg)',
              transition: 'transform 0.4s ease-in-out',
            }}
          >
            {isSleeping && (
              <div
                className="sleeping-zzz-bubble"
                style={{
                  position: 'absolute',
                  top: currentZzzOffset.top,
                  left: currentZzzOffset.left,
                  color: '#fff',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  letterSpacing: '2px',
                  textShadow: '2px 2px 0px #000',
                  zIndex: 10,
                  transform: 'rotate(-90deg)', // Poništava rotaciju ljubimca da ZZZ stoji uspravno
                  whiteSpace: 'nowrap',
                }}
              >
                ZZZ...
              </div>
            )}

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
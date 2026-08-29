import React, { useState, useEffect } from 'react';
import pozadinaDvoriste from '../assets/pozadine/dvoriste.png';

import ikonaKuca from '../assets/ikonice/kucica.png';
import ikonaRanac from '../assets/ikonice/ranac.png';
import ikonaZatvori from '../assets/ikonice/X.png';
import ikonaSkini from '../assets/ikonice/bez.png'; 

import srceSreca from '../assets/ikonice/zeleno_srce.png';
import srceSitost from '../assets/ikonice/narandzasto_srce.png';
import { Upozorenje } from '../komponente/upozorenje.tsx';

import naocare1 from '../assets/aksesoari/naocare1.png';
import naocare2 from '../assets/aksesoari/naocare2.png';
import naocareSrca from '../assets/aksesoari/naocaresrca.png';
import naocareUske from '../assets/aksesoari/naocare3.png';
import naocareCrvene from '../assets/aksesoari/naocarecrvene.png';
import leptir from '../assets/aksesoari/leptir.png';
import list from '../assets/aksesoari/list.png';
import lopta from '../assets/aksesoari/lopta.png';
import napitak from '../assets/aksesoari/napitak.png';

import { SpeechBubble } from '../komponente/speechbubble';
import '../stil/dvoriste.css';

interface Props {
  selectedPet: { id: string; slika: string } | null;
  petName?: string;
  happiness?: number;
  hunger?: number;
  setHappiness?: React.Dispatch<React.SetStateAction<number>>;
  setHunger?: React.Dispatch<React.SetStateAction<number>>;
  equippedAccessories: Record<'naocare' | 'ostalo' | 'igracke', string | null>;
  setEquippedAccessories: React.Dispatch<React.SetStateAction<Record<'naocare' | 'ostalo' | 'igracke', string | null>>>;
  onNavigate?: (screen: string) => void;
}

interface IAksesoar {
  id: string;
  naziv: string;
  slika: string;
  kategorija: 'naocare' | 'ostalo' | 'igracke';
}

interface IWeatherData {
  temperature: number;
  weatherCode: number;
}

const ACCESSORY_OFFSETS: Record<string, Record<string, { top: string; left: string; width: string }>> = {
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

export default function Dvoriste({
  selectedPet,
  petName,
  happiness,
  hunger,
  setHappiness,
  setHunger,
  equippedAccessories,
  setEquippedAccessories,
  onNavigate,
}: Props) {
  const [backpackOpen, setBackpackOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'naocare' | 'ostalo' | 'igracke'>('naocare');
  const [weather, setWeather] = useState<IWeatherData | null>(null);
  const [loadingWeather, setLoadingWeather] = useState<boolean>(true);
  const [speechText, setSpeechText] = useState<string | null>(null);

  useEffect(() => {
    const hasSeenTutorial = localStorage.getItem('hasSeenBackpackTutorial');
    if (!hasSeenTutorial) {
      setSpeechText('Otvori ranac\ni stavi mi\nneki aksesoar!');
    }
  }, []);

  const [prikaziUpozorenje, setPrikaziUpozorenje] = useState(false);
  const [porukaUpozorenja, setPorukaUpozorenja] = useState('');

  useEffect(() => {
    const happinessInterval = setInterval(() => {
      if (setHappiness) {
        setHappiness((prev) => Math.max(prev - 1, 0));
      }
    }, 45000); 

    return () => clearInterval(happinessInterval);
  }, [setHappiness]);

  useEffect(() => {
    const hungerInterval = setInterval(() => {
      if (setHunger) {
        setHunger((prev) => Math.max(prev - 1, 0));
      }
    }, 30000); 

    return () => clearInterval(hungerInterval);
  }, [setHunger]);

  useEffect(() => {
    if (happiness === 1) {
      setPorukaUpozorenja('Pažnja! Sreća vašeg ljubimca je pala na 1 srce!');
      setPrikaziUpozorenje(true);
    } else if (hunger === 1) {
      setPorukaUpozorenja('Pažnja! Vaš ljubimac je gladan, ostalo je samo 1 srce sitosti!');
      setPrikaziUpozorenje(true);
    }
  }, [happiness, hunger]);

  useEffect(() => {
    fetch('https://api.open-meteo.com/v1/forecast?latitude=44.81&longitude=20.46&current_weather=true')
      .then((res) => res.json())
      .then((data) => {
        if (data.current_weather) {
          setWeather({
            temperature: Math.round(data.current_weather.temperature),
            weatherCode: data.current_weather.weathercode,
          });
        }
        setLoadingWeather(false);
      })
      .catch((err) => {
        console.error('Greška pri dobavljanju vremenske prognoze:', err);
        setLoadingWeather(false);
      });
  }, []);

  const getWeatherDescription = (code: number) => {
    if (code === 0) return 'Sunčano ☀️';
    if (code >= 1 && code <= 3) return 'Delimično oblačno ⛅';
    if (code >= 51 && code <= 67) return 'Kišovito 🌧️';
    if (code >= 71 && code <= 77) return 'Sneg ❄️';
    return 'Oblačno ☁️';
  };

  const aksesoari: IAksesoar[] = [
    { id: 'naocare1', naziv: 'Piksel naočare 1', slika: naocare1, kategorija: 'naocare' },
    { id: 'naocare2', naziv: 'Piksel naočare 2', slika: naocare2, kategorija: 'naocare' },
    { id: 'naocare_srcad', naziv: 'Naočare srce', slika: naocareSrca, kategorija: 'naocare' },
    { id: 'naocare_uske', naziv: 'Uske naočare', slika: naocareUske, kategorija: 'naocare' },
    { id: 'naocare_crvene', naziv: 'Crvene naočare', slika: naocareCrvene, kategorija: 'naocare' },
    { id: 'leptir', naziv: 'Leptir', slika: leptir, kategorija: 'ostalo' },
    { id: 'list', naziv: 'List', slika: list, kategorija: 'ostalo' },
    { id: 'lopta', naziv: 'Lopta', slika: lopta, kategorija: 'igracke' },
    { id: 'napitak', naziv: 'Napitak', slika: napitak, kategorija: 'igracke' },
  ];

  const handleOpenBackpack = () => {
    if (speechText) {
      setSpeechText(null);
      localStorage.setItem('hasSeenBackpackTutorial', 'true');
    }
    setBackpackOpen(true);
  };

  const handleDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData('text/plain', id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain');
    const accessory = aksesoari.find((a) => a.id === id);
    if (accessory) {
      setEquippedAccessories((prev) => ({
        ...prev,
        [accessory.kategorija]: accessory.id,
      }));
    }
  };

  const activeAccessoriesList = Object.values(equippedAccessories)
    .filter((id): id is string => id !== null)
    .map((id) => aksesoari.find((a) => a.id === id))
    .filter((item): item is IAksesoar => item !== undefined);

  const petId = selectedPet?.id || 'zaba';
  const filteredAccessories = aksesoari.filter((item) => item.kategorija === activeTab);

  return (
    <div className="dvoriste-container">
      <div
        className="dvoriste-wrapper"
        style={{ backgroundImage: `url(${pozadinaDvoriste})` }}
      >
        <div className="weather-widget">
          {loadingWeather ? (
            <span>Učitavanje...</span>
          ) : weather ? (
            <span>{getWeatherDescription(weather.weatherCode)} {weather.temperature}°C</span>
          ) : (
            <span>Prognoza nedostupna</span>
          )}
        </div>

        <div className="top-right-navigation">
          <button
            className="nav-icon-btn"
            onClick={() => onNavigate && onNavigate('room')}
            title="Povratak u dnevnu sobu"
          >
            <img src={ikonaKuca} alt="Kućica" />
          </button>

          {!backpackOpen && (
            <button
              className="nav-icon-btn"
              onClick={handleOpenBackpack}
              title="Otvori ranac"
            >
              <img src={ikonaRanac} alt="Ranac" />
            </button>
          )}
        </div>

        {speechText && (
          <div
            style={{
              position: 'absolute',
              top: '35%',
              left: '43%',
              transform: 'translateX(-50%)',
              zIndex: 99,
              pointerEvents: 'none',
            }}
          >
            <SpeechBubble text={speechText} scale={1.2} fontSize="12px" />
          </div>
        )}

        <div
          className="pet-outside-container"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <span className="pet-outside-name">
            {petName ? petName.toUpperCase() : 'MARKO'}
          </span>

          <div className="pet-sprite-wrapper">
            {selectedPet && (
              <img
                src={selectedPet.slika}
                alt="Ljubimac"
                className="pixel-pet-outside"
              />
            )}

            {activeAccessoriesList.map((accObj) => {
              const customOffset =
                ACCESSORY_OFFSETS[petId]?.[accObj.id] || { top: '30%', left: '50%', width: '45px' };

              return (
                <img
                  key={accObj.id}
                  src={accObj.slika}
                  alt={accObj.naziv}
                  className="equipped-accessory-item"
                  style={{
                    top: customOffset.top,
                    left: customOffset.left,
                    width: customOffset.width,
                  }}
                />
              );
            })}
          </div>
        </div>

        <div className="bottom-stats-container">
          <div className="stat-box">
            <span className="stat-title">SREĆA:</span>
            <div className="hearts-column">
              {Array.from({ length: happiness ?? 0 }).map((_, i) => (
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
              {Array.from({ length: hunger ?? 0 }).map((_, i) => (
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

        {backpackOpen && (
          <div className="backpack-overlay-menu">
            <button
              className="close-backpack-btn"
              onClick={() => setBackpackOpen(false)}
            >
              <img src={ikonaZatvori} alt="Zatvori" />
            </button>

            <div className="backpack-tabs">
              <button
                className={`backpack-tab-btn ${activeTab === 'naocare' ? 'active-tab' : ''}`}
                onClick={() => setActiveTab('naocare')}
              >
                Naočare
              </button>
              <button
                className={`backpack-tab-btn ${activeTab === 'ostalo' ? 'active-tab' : ''}`}
                onClick={() => setActiveTab('ostalo')}
              >
                Ostali aksesoari
              </button>
              <button
                className={`backpack-tab-btn ${activeTab === 'igracke' ? 'active-tab' : ''}`}
                onClick={() => setActiveTab('igracke')}
              >
                Igračke
              </button>
            </div>

            <div className="accessories-grid">
              <div
                className={`accessory-slot remove-slot ${
                  equippedAccessories[activeTab] === null ? 'active-slot' : ''
                }`}
                onClick={() =>
                  setEquippedAccessories((prev) => ({
                    ...prev,
                    [activeTab]: null,
                  }))
                }
                title={`Skini ${activeTab === 'naocare' ? 'naočare' : activeTab === 'ostalo' ? 'aksesoar' : 'igračku'}`}
              >
                <img src={ikonaSkini} alt="Skini aksesoar" />
              </div>

              {filteredAccessories.map((item) => (
                <div
                  key={item.id}
                  className={`accessory-slot ${
                    equippedAccessories[activeTab] === item.id ? 'active-slot' : ''
                  }`}
                  onClick={() =>
                    setEquippedAccessories((prev) => ({
                      ...prev,
                      [item.kategorija]: item.id,
                    }))
                  }
                  draggable
                  onDragStart={(e) => handleDragStart(e, item.id)}
                  title={item.naziv}
                >
                  <img src={item.slika} alt={item.naziv} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {prikaziUpozorenje && (
        <Upozorenje 
          message={porukaUpozorenja} 
          type="warning" 
          duration={4000}
          onClose={() => setPrikaziUpozorenje(false)} 
        />
      )}
    </div>
  );
}
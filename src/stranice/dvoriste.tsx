import React, { useState } from 'react';
import pozadinaDvoriste from '../assets/pozadine/dvoriste.png';


import ikonaKuca from '../assets/ikonice/kucica.png';
import ikonaRanac from '../assets/ikonice/ranac.png';
import ikonaZatvori from '../assets/ikonice/X.png';
import ikonaSkini from '../assets/ikonice/bez.png'; 


import naocare1 from '../assets/aksesoari/naocare1.png';
import naocare2 from '../assets/aksesoari/naocare2.png';
import naocareSrca from '../assets/aksesoari/naocaresrca.png';
import naocareUske from '../assets/aksesoari/naocare3.png';
import naocareCrvene from '../assets/aksesoari/naocarecrvene.png';
import leptir from '../assets/aksesoari/leptir.png';
import list from '../assets/aksesoari/list.png';
import lopta from '../assets/aksesoari/lopta.png';
import napitak from '../assets/aksesoari/napitak.png';

import '../stil/dvoriste.css';

interface Props {
  selectedPet: { id: string; slika: string } | null;
  petName?: string;
  equippedAccessory: string | null;
  setEquippedAccessory: (acc: string | null) => void;
  onNavigate?: (screen: string) => void;
}

interface IAksesoar {
  id: string;
  naziv: string;
  slika: string;
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
  equippedAccessory,
  setEquippedAccessory,
  onNavigate,
}: Props) {
  const [backpackOpen, setBackpackOpen] = useState(false);

  const aksesoari: IAksesoar[] = [
    { id: 'naocare1', naziv: 'Piksel naočare 1', slika: naocare1 },
    { id: 'naocare2', naziv: 'Piksel naočare 2', slika: naocare2 },
    { id: 'naocare_srcad', naziv: 'Naočare srce', slika: naocareSrca },
    { id: 'naocare_uske', naziv: 'Uske naočare', slika: naocareUske },
    { id: 'naocare_crvene', naziv: 'Crvene naočare', slika: naocareCrvene },
    { id: 'leptir', naziv: 'Leptir', slika: leptir },
    { id: 'list', naziv: 'List', slika: list },
    { id: 'lopta', naziv: 'Lopta', slika: lopta },
    { id: 'napitak', naziv: 'Napitak', slika: napitak },
  ];

  // DRAG & DROP HANDLERS
  const handleDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData('text/plain', id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain');
    if (id) {
      setEquippedAccessory(id);
    }
  };

  const activeAccessoryObj = aksesoari.find((a) => a.id === equippedAccessory);

  const petId = selectedPet?.id || 'zaba';
  const customOffset =
    equippedAccessory && ACCESSORY_OFFSETS[petId]?.[equippedAccessory]
      ? ACCESSORY_OFFSETS[petId][equippedAccessory]
      : { top: '30%', left: '50%', width: '45px' };

  return (
    <div className="dvoriste-container">
      <div
        className="dvoriste-wrapper"
        style={{ backgroundImage: `url(${pozadinaDvoriste})` }}
      >
        
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
              onClick={() => setBackpackOpen(true)}
              title="Otvori ranac"
            >
              <img src={ikonaRanac} alt="Ranac" />
            </button>
          )}
        </div>

        
        <div className="dialog-speech-bubble">
          <span>Kako je divan dan napolju!</span>
        </div>

        
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

            
            {activeAccessoryObj && (
              <img
                src={activeAccessoryObj.slika}
                alt="Aksesoar"
                className="equipped-accessory-item"
                style={{
                  top: customOffset.top,
                  left: customOffset.left,
                  width: customOffset.width,
                }}
              />
            )}
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

            <div className="accessories-grid">
             
              <div
                className={`accessory-slot remove-slot ${
                  equippedAccessory === null ? 'active-slot' : ''
                }`}
                onClick={() => setEquippedAccessory(null)}
                title="Skini aksesoar"
              >
                <img src={ikonaSkini} alt="Skini aksesoar" />
              </div>

              
              {aksesoari.map((item) => (
                <div
                  key={item.id}
                  className={`accessory-slot ${
                    equippedAccessory === item.id ? 'active-slot' : ''
                  }`}
                  onClick={() => setEquippedAccessory(item.id)}
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
    </div>
  );
}
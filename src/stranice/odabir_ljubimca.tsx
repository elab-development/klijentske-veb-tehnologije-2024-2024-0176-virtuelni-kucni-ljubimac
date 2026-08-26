import React, { useState } from 'react';

import slikaMacka from '../assets/ljubimci/macka.png';
import slikaZaba from '../assets/ljubimci/zaba.png';
import slikaPatka from '../assets/ljubimci/patka.png';
import slikaPtica from '../assets/ljubimci/ptica.png';
import slikaJez from '../assets/ljubimci/jez.png';
import slikaKornjaca from '../assets/ljubimci/kornjaca.png';
import slikaPatak from '../assets/ljubimci/patak.png';
import slikaRibica from '../assets/ljubimci/ribica.png';
import slikaZmija from '../assets/ljubimci/zmija.png';

import biranjePozadina from '../assets/pozadine/biranje_pozadina.png';

import '../stil/odabir_ljubimca.css';

interface ILjubimacItem {
  id: string;
  ime: string;
  slika: string;
}

interface Props {
  setSelectedPet: (pet: { id: string; slika: string }) => void;
  onNavigate?: (screen: string) => void;
  onConfirm?: () => void;
}

export default function OdabirLjubimca({ setSelectedPet, onNavigate, onConfirm }: Props) {
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);

  const ljubimci: ILjubimacItem[] = [
    { id: 'macka', ime: 'Mačka', slika: slikaMacka },
    { id: 'zaba', ime: 'Žaba', slika: slikaZaba },
    { id: 'patka', ime: 'Patka', slika: slikaPatka },
    { id: 'ptica', ime: 'Ptica', slika: slikaPtica },
    { id: 'jez', ime: 'Jež', slika: slikaJez },
    { id: 'kornjaca', ime: 'Kornjača', slika: slikaKornjaca },
    { id: 'patak', ime: 'Patak', slika: slikaPatak },
    { id: 'ribica', ime: 'Ribica', slika: slikaRibica },
    { id: 'zmija', ime: 'Zmija', slika: slikaZmija },
  ];

  const handlePetClick = (ljubimac: ILjubimacItem) => {
    setSelectedPetId(ljubimac.id);
    setSelectedPet({ id: ljubimac.id, slika: ljubimac.slika });
  };

  const handleConfirm = () => {
    if (selectedPetId) {
      const izabrani = ljubimci.find((p) => p.id === selectedPetId);
  
      const userId = localStorage.getItem('user_id') || 'trenutni_korisnik';
  
      localStorage.setItem(
        `pet_${userId}`,
        JSON.stringify({
          id: selectedPetId,
          slika: izabrani?.slika,
        })
      );
    }
  
    if (onConfirm) {
      onConfirm();
    } else if (onNavigate) {
      onNavigate('name-pet');
    }
  };

  return (
    <div 
      className="pet-select-container" 
      style={{ backgroundImage: `url(${biranjePozadina})` }}
    >
      <div className="pet-select-overlay">
        <div className="pet-selection-box">
          <div className="honeycomb-wrapper">
            <div className="honeycomb-row">
              {ljubimci.slice(0, 3).map((ljubimac) => (
                <div
                  key={ljubimac.id}
                  className={`pet-circle ${selectedPetId === ljubimac.id ? 'selected' : ''}`}
                  onClick={() => handlePetClick(ljubimac)}
                >
                  <img src={ljubimac.slika} alt={ljubimac.ime} className="pet-pixel-image" />
                </div>
              ))}
            </div>

            <div className="honeycomb-row middle-row">
              {ljubimci.slice(3, 6).map((ljubimac) => (
                <div
                  key={ljubimac.id}
                  className={`pet-circle ${selectedPetId === ljubimac.id ? 'selected' : ''}`}
                  onClick={() => handlePetClick(ljubimac)}
                >
                  <img src={ljubimac.slika} alt={ljubimac.ime} className="pet-pixel-image" />
                </div>
              ))}
            </div>

            <div className="honeycomb-row">
              {ljubimci.slice(6, 9).map((ljubimac) => (
                <div
                  key={ljubimac.id}
                  className={`pet-circle ${selectedPetId === ljubimac.id ? 'selected' : ''}`}
                  onClick={() => handlePetClick(ljubimac)}
                >
                  <img src={ljubimac.slika} alt={ljubimac.ime} className="pet-pixel-image" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bottom-area">
          {selectedPetId ? (
            <button className="confirm-btn" onClick={handleConfirm}>
              POTVRDI
            </button>
          ) : (
            <div className="instruction-box">
              <p>ODABERI SVOG NOVOG</p>
              <p>NAJBOLJEG PRIJATELJA!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
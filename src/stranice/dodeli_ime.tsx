import React, { useState, useEffect } from 'react';
import pozadinaSoba from '../assets/pozadine/dnevnasobaslika.png';
import '../stil/dodeli_ime.css';

interface Props {
  selectedPet: { id: string; slika: string } | null;
  petName?: string;
  setPetName: (name: string) => void;
  onConfirm?: (finalName: string) => void;
}

export default function DodeliIme({ selectedPet, petName, setPetName, onConfirm }: Props) {
  const [inputName, setInputName] = useState(petName || '');

  useEffect(() => {
    if (petName !== undefined) {
      setInputName(petName);
    }
  }, [petName]);

  const isValid = inputName.trim().length >= 2;

  const handleConfirm = () => {
    if (isValid) {
      const finalName = inputName.trim();
      setPetName(finalName);

      if (onConfirm) {
        onConfirm(finalName);
      }
    }
  };

  return (
    <div className="name-pet-container">
      <div 
        className="name-pet-wrapper" 
        style={{ backgroundImage: `url(${pozadinaSoba})` }}
      >
        <div className="tv-text-box">
          <span className="tv-row">OVO JE TVOJ NOVI</span>
          <span className="tv-row">VIRTUELNI KUĆNI</span>
          <span className="tv-row">LJUBIMAC!</span>
          <span className="tv-row tv-row-sub">VREME JE DA MU DAŠ IME!</span>
        </div>

        {/* Ljubimac na kauču sa direktno primenjenom pozicijom nadole */}
        <div className="pet-on-couch" style={{ top: '40%', position: 'absolute' }}>
          {selectedPet && (
            <img 
              src={selectedPet.slika} 
              alt="Ljubimac" 
              className="couch-pixel-pet" 
            />
          )}
        </div>

        <div className="table-controls">
          <div className="table-title">TVOJ NOVI LJUBIMAC ZVAĆE SE:</div>
          <input 
            type="text" 
            className="pixel-input-box"
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleConfirm()}
            maxLength={12}
            placeholder="Unesi ime..."
          />
          
          <button 
            className="confirm-btn-action" 
            onClick={handleConfirm}
            disabled={!isValid}
          >
            POTVRDI
          </button>
        </div>
      </div>
    </div>
  );
}
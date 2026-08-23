import React from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  selectedPet: { id: string; slika: string } | string | null;
  petName: string;
  setPetName: (name: string) => void;
  onConfirm: () => void;
}

export default function DodeliIme({ selectedPet, petName, setPetName, onConfirm }: Props) {
  const navigate = useNavigate();

  const PotvrdiUnos = (e: React.FormEvent) => {
    e.preventDefault();
    if (!petName.trim()) return;

    if (onConfirm) {
      onConfirm();
    }
    // Prelazak u dnevnu 
    navigate('/dnevna_soba');
  };

  return (
    <div className="page-container">
      <div className="pixel-card" style={{ padding: '20px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '14px', marginBottom: '15px' }}>DODELI IME LJUBIMCU</h2>
        
        {selectedPet && (
          <div style={{ marginBottom: '15px' }}>
            <img 
              src={typeof selectedPet === 'string' ? selectedPet : selectedPet.slika} 
              alt="Izabrani ljubimac" 
              style={{ width: '80px', height: '80px', imageRendering: 'pixelated', display: 'block', margin: '0 auto 10px auto' }} 
            />
            <p style={{ fontSize: '10px' }}>
              Izabrani ljubimac: <strong>{typeof selectedPet === 'string' ? selectedPet.toUpperCase() : selectedPet.id.toUpperCase()}</strong>
            </p>
          </div>
        )}

        <form onSubmit={PotvrdiUnos}>
          <div style={{ marginBottom: '15px' }}>
            <input
              type="text"
              value={petName}
              onChange={(e) => setPetName(e.target.value)}
              placeholder="Unesi ime..."
              style={{
                padding: '10px',
                fontFamily: "'Press Start 2P', cursive",
                fontSize: '10px',
                border: '3px solid #000'
              }}
              required
            />
          </div>

          <button type="submit" className="pixel-button">
            POTVRDI
          </button>
        </form>
      </div>
    </div>
  );
}
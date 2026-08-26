import React, { useState } from 'react';
import prijavaPozadina from '/pozadine/prijava_pozadina.jpg';
import '../stil/log_reg.css';

interface Props {
  onNavigate?: (screen: string) => void;
}

export default function Login({ onNavigate }: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const postojeciKorisnici = JSON.parse(localStorage.getItem('users') || '[]');

      const pronadjeniKorisnik = postojeciKorisnici.find(
        (u: any) =>
          u.username.trim().toLowerCase() === username.trim().toLowerCase() &&
          u.password === password
      );

      if (!pronadjeniKorisnik) {
        setError('Neispravno korisničko ime ili lozinka!');
        return;
      }

      localStorage.setItem('currentUser', JSON.stringify(pronadjeniKorisnik));

      const userPetKey = `pet_${pronadjeniKorisnik.username.trim().toLowerCase()}`;
      const sacuvaniLjubimac = localStorage.getItem(userPetKey);

      if (onNavigate) {
        if (sacuvaniLjubimac) {
          onNavigate('room');
        } else {
          onNavigate('choose-pet');
        }
      }
    } catch (err) {
      console.error('Greška pri prijavi:', err);
      setError('Došlo je do greške pri prijavi. Pokušajte ponovo.');
    }
  };

  return (
    <div 
      className="logreg-bg prijava-bg"
      style={{
        backgroundImage: `url(${prijavaPozadina})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        width: '100vw'
      }}
    >
      <h1 className="logreg-title">PRIJAVA</h1>

      <form onSubmit={handleSubmit} className="logreg-wrapper">
        <div className="logreg-card">
          <button
            type="button"
            className="close-btn"
            onClick={() => onNavigate && onNavigate('welcome')}
            title="Zatvori"
          >
            ✖
          </button>

          <p className="logreg-card-text">UNESI SVOJE PODATKE ZA PRIJAVU:</p>

          {error && <div className="error-message">{error}</div>}

          <div className="input-group">
            <label>KORISNIČKO IME:</label>
            <input
              type="text"
              className="pixel-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>LOZINKA:</label>
            <input
              type="password"
              className="pixel-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>

        <button type="submit" className="logreg-btn">
          ✦ PRIJAVI SE
        </button>
      </form>
    </div>
  );
}
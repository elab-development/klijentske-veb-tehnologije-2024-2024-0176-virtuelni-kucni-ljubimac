import React, { useState } from 'react';
import '../stil/log_reg.css';

interface Props {
  onNavigate: (screen: string) => void;
}

export default function Login({ onNavigate }: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

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

    // Proveravamo da li korisnik već ima sačuvanog ljubimca
    const userPetKey = `pet_${pronadjeniKorisnik.username.trim().toLowerCase()}`;
    const sacuvaniLjubimac = localStorage.getItem(userPetKey);

    if (sacuvaniLjubimac) {
      onNavigate('room'); // Ako ima ljubimca, ide direktno u sobu
    } else {
      onNavigate('choose-pet'); // Ako nema, ide na izbor ljubimca
    }
  };

  return (
    <div className="logreg-bg prijava-bg">
      <h1 className="logreg-title">PRIJAVA</h1>

      <form onSubmit={handleSubmit} className="logreg-wrapper">
        <div className="logreg-card">
          <button 
            type="button" 
            className="close-btn" 
            onClick={() => onNavigate('welcome')}
            title="Zatvori"
          >
            ✖
          </button>

          <p className="logreg-card-text">
            LEPO JE VIDETI TE PONOVO!<br />
            TVOJ LJUBIMAC TE NESTRPLJIVO ČEKA!
          </p>

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
            <div className="password-input-container">
              <input
                type={showPassword ? 'text' : 'password'}
                className="pixel-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="toggle-password-btn"
                onClick={() => setShowPassword(!showPassword)}
                title={showPassword ? 'Sakrij lozinku' : 'Prikaži lozinku'}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          <span
            className="forgot-link"
            onClick={() => onNavigate('forgot-password')}
          >
            Klikni ovde ako se ne sećaš lozinke!
          </span>

          <span
            className="forgot-link"
            onClick={() => onNavigate('signup')}
          >
            Nemaš nalog? Registruj se!
          </span>
        </div>

        <button type="submit" className="logreg-btn pulse-btn">
            ▶ PRIJAVI SE
        </button>
      </form>
    </div>
  );
}
import React, { useState } from 'react';
import '../stil/log_reg.css';

interface Props {
  onNavigate: (screen: string) => void;
}

export default function Signup({ onNavigate }: Props) {
  const [formData, setFormData] = useState({
    ime: '',
    username: '',
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const pass = formData.password;
  const hasMinLength = pass.length >= 8;
  const hasUpper = /[A-Z]/.test(pass);
  const hasLower = /[a-z]/.test(pass);
  const hasNumber = /[0-9]/.test(pass);
  const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pass);

  const isPasswordValid = hasMinLength && hasUpper && hasLower && hasNumber && hasSpecial;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isPasswordValid) {
      setError('Lozinka mora ispunjavati sve navedene uslove!');
      return;
    }

    const postojeciKorisnici = JSON.parse(localStorage.getItem('users') || '[]');

    const vecPostoji = postojeciKorisnici.some(
      (u: any) => u.username.trim().toLowerCase() === formData.username.trim().toLowerCase()
    );

    if (vecPostoji) {
      setError('Korisničko ime je već zauzeto!');
      return;
    }

    postojeciKorisnici.push(formData);
    localStorage.setItem('users', JSON.stringify(postojeciKorisnici));

    setError('');
    onNavigate('login');
  };

  return (
    <div className="logreg-bg registracija-bg">
      <h1 className="logreg-title">REGISTRACIJA</h1>

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

          <p className="logreg-card-text">MOLIM TE UNESI SLEDEĆE PODATKE:</p>

          {error && <div className="error-message">{error}</div>}

          <div className="input-group">
            <label>IME:</label>
            <input
              type="text"
              className="pixel-input"
              value={formData.ime}
              onChange={(e) => setFormData({ ...formData, ime: e.target.value })}
              required
            />
          </div>

          <div className="input-group">
            <label>KORISNIČKO IME:</label>
            <input
              type="text"
              className="pixel-input"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              required
            />
          </div>

          <div className="input-group">
            <label>E-MAIL:</label>
            <input
              type="email"
              className="pixel-input"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <div className="input-group">
            <label>LOZINKA:</label>
            <div className="password-input-container">
              <input
                type={showPassword ? 'text' : 'password'}
                className="pixel-input"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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

            <div className="password-rules">
              <div className={hasMinLength ? 'rule-ok' : 'rule-bad'}>
                {hasMinLength ? '✓' : '✗'} Najmanje 8 karaktera
              </div>
              <div className={hasUpper ? 'rule-ok' : 'rule-bad'}>
                {hasUpper ? '✓' : '✗'} Najmanje jedno veliko slovo (A-Z)
              </div>
              <div className={hasLower ? 'rule-ok' : 'rule-bad'}>
                {hasLower ? '✓' : '✗'} Najmanje jedno malo slovo (a-z)
              </div>
              <div className={hasNumber ? 'rule-ok' : 'rule-bad'}>
                {hasNumber ? '✓' : '✗'} Najmanje jedan broj (0-9)
              </div>
              <div className={hasSpecial ? 'rule-ok' : 'rule-bad'}>
                {hasSpecial ? '✓' : '✗'} Specijalni karakter (!@#$%...)
              </div>
            </div>
          </div>
        </div>

        <button type="submit" className="logreg-btn">
          ✦ REGISTRUJ SE
        </button>
      </form>
    </div>
  );
}
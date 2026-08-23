import React, { useState } from 'react';
import '../stil/log_reg.css';

interface Props {
  onNavigate: (screen: string) => void;
}

export default function ForgotPassword({ onNavigate }: Props) {
  const [step, setStep] = useState<1 | 2>(1);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const hasMinLength = newPassword.length >= 8;
  const hasUpper = /[A-Z]/.test(newPassword);
  const hasLower = /[a-z]/.test(newPassword);
  const hasNumber = /[0-9]/.test(newPassword);
  const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(newPassword);
  const isPasswordValid = hasMinLength && hasUpper && hasLower && hasNumber && hasSpecial;

  const handleVerifyAccount = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const postojeciKorisnici = JSON.parse(localStorage.getItem('users') || '[]');

    const korisnik = postojeciKorisnici.find(
      (u: any) =>
        u.username.trim().toLowerCase() === username.trim().toLowerCase() &&
        u.email.trim().toLowerCase() === email.trim().toLowerCase()
    );

    if (!korisnik) {
      setError('Korisnik sa tim imenom i e-mailom ne postoji!');
      return;
    }

    setStep(2);
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isPasswordValid) {
      setError('Nova lozinka mora ispunjavati sve uslove!');
      return;
    }

    const postojeciKorisnici = JSON.parse(localStorage.getItem('users') || '[]');

    const azuriraniKorisnici = postojeciKorisnici.map((u: any) => {
      if (u.username.trim().toLowerCase() === username.trim().toLowerCase()) {
        return { ...u, password: newPassword };
      }
      return u;
    });

    localStorage.setItem('users', JSON.stringify(azuriraniKorisnici));
    alert('Lozinka je uspešno promenjena! Sada se možeš prijaviti.');
    onNavigate('login');
  };

  return (
    <div className="logreg-bg prijava-bg">
      <h1 className="logreg-title">RESET LOZINKE</h1>

      <div className="logreg-wrapper">
        <div className="logreg-card">
          <button 
            type="button" 
            className="close-btn" 
            onClick={() => onNavigate('welcome')}
            title="Zatvori"
          >
            ✖
          </button>

          {error && <div className="error-message">{error}</div>}

          {step === 1 ? (
            <form onSubmit={handleVerifyAccount} style={{ width: '100%' }}>
              <p className="logreg-card-text">
                UNESI KORISNIČKO IME I E-MAIL DA PRONAĐEMO TVOJ NALOG:
              </p>

              <div className="input-group" style={{ marginBottom: '15px' }}>
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
                <label>E-MAIL:</label>
                <input
                  type="email"
                  className="pixel-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="logreg-btn">
                PROVERI NALOG
              </button>
            </form>
          ) : (
            <form onSubmit={handleResetPassword} style={{ width: '100%' }}>
              <p className="logreg-card-text">UNESI NOVU LOZINKU:</p>

              <div className="input-group">
                <label>NOVA LOZINKA:</label>
                <div className="password-input-container">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="pixel-input"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="toggle-password-btn"
                    onClick={() => setShowPassword(!showPassword)}
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

              <button type="submit" className="logreg-btn">
                SAČUVAJ LOZINKU
              </button>
            </form>
          )}

          <span
            className="forgot-link"
            onClick={() => onNavigate('login')}
            style={{ marginTop: '15px' }}
          >
            ← Nazad na prijavu
          </span>
        </div>
      </div>
    </div>
  );
}
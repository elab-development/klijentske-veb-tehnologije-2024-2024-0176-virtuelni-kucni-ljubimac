import React from 'react';
import '../stil/logout.css';

interface Props {
  onNavigate: (screen: string) => void;
}

export default function Logout({ onNavigate }: Props) {
  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    onNavigate('welcome');
  };

  return (
    <div className="logout-bg">
      <div className="logout-content">
        <button 
          type="button" 
          className="logout-close-btn" 
          onClick={() => onNavigate('home')}
          title="Zatvori"
        >
          ✖
        </button>

        <p className="logout-text">
          IDEŠ? NADAM SE DA ĆEŠ ME<br />
          POSETITI OPET USKORO.<br />
          ČEKAM TE!
        </p>

        <button 
          type="button" 
          className="logout-btn"
          onClick={handleLogout}
        >
          IZLOGUJ SE :(
        </button>
      </div>
    </div>
  );
}
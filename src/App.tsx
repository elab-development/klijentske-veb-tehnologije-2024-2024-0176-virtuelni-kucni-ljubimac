import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';

import Dobrodosli from './stranice/dobrodosli';
import Login from './stranice/login';
import Signup from './stranice/signup';
import ForgotPassword from './stranice/zaboravljena_lozinka';
import OdabirLjubimca from './stranice/odabir_ljubimca';
import DodeliIme from './stranice/dodeli_ime';
import DnevnaSoba from './stranice/dnevna_soba';
import Dvoriste from './stranice/dvoriste';
import Logout from './stranice/logout';
import GameOver from './stranice/game_over';

import Zvuk from './komponente/zvuk';

import './App.css';

interface ILjubimac {
  id: string;
  slika: string;
}

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedPet, setSelectedPet] = useState<ILjubimac | null>(null);
  const [petName, setPetName] = useState<string>('');

  const [happiness, setHappiness] = useState<number>(3);
  const [hunger, setHunger] = useState<number>(3);

  const [equippedAccessory, setEquippedAccessory] = useState<string | null>(null);

  // Tajmer za sreću
  useEffect(() => {
    const timerHappiness = setInterval(() => {
      setHappiness((prev) => Math.max(prev - 1, 0));
    }, 60000);
    return () => clearInterval(timerHappiness);
  }, []);

  // Tajmer za glad
  useEffect(() => {
    const timerHunger = setInterval(() => {
      setHunger((prev) => Math.max(prev - 1, 0));
    }, 120000);
    return () => clearInterval(timerHunger);
  }, []);

  // Game over provera
  useEffect(() => {
    if (
      happiness === 0 && 
      hunger === 0 && 
      location.pathname !== '/' && 
      location.pathname !== '/login' &&
      location.pathname !== '/game-over'
    ) {
      navigate('/game-over');
    }
  }, [happiness, hunger, location.pathname, navigate]);

  // Učitavanje iz localStorage-a pri pokretanju
  useEffect(() => {
    try {
      const currentUserRaw = localStorage.getItem('currentUser');
      if (!currentUserRaw) return;

      const user = JSON.parse(currentUserRaw);
      if (!user || !user.username) return;

      const userPetKey = `pet_${user.username.trim().toLowerCase()}`;
      const sacuvaniPodaci = localStorage.getItem(userPetKey);

      if (sacuvaniPodaci) {
        const parsedData = JSON.parse(sacuvaniPodaci);
        if (parsedData.pet) setSelectedPet(parsedData.pet);
        if (parsedData.name) setPetName(parsedData.name);
      }
    } catch (error) {
      console.error('Greška pri učitavanju iz localStorage:', error);
    }
  }, []);

  // Funkcija za navigaciju
  const handleNavigate = (screen: string) => {
    if (screen === 'welcome' || screen === '/') {
      navigate('/');
    } else if (screen === 'login') {
      navigate('/login');
    } else if (screen === 'signup') {
      navigate('/signup');
    } else if (screen === 'forgot-password') {
      navigate('/forgot-password');
    } else if (screen === 'odabir_ljubimca' || screen === 'odabir-ljubimca' || screen === 'choose-pet') {
      navigate('/odabir-ljubimca');
    } else if (screen === 'dodeli_ime' || screen === 'dodeli-ime' || screen === 'name-pet') {
      navigate('/dodeli-ime');
    } else if (screen === 'dnevna_soba' || screen === 'dnevna-soba' || screen === 'room') {
      navigate('/dnevna-soba');
    } else if (screen === 'dvoriste' || screen === 'outside') {
      navigate('/dvoriste');
    } else if (screen === 'game-over') {
      navigate('/game-over');
    } else if (screen === 'logout') {
      navigate('/logout');
    } else {
      navigate(`/${screen}`);
    }
  };

  const handleConfirmName = (finalName?: string) => {
    const nameToSave = finalName !== undefined ? finalName : petName;

    try {
      const currentUserRaw = localStorage.getItem('currentUser');
      
      if (!currentUserRaw) {
        navigate('/login');
        return;
      }

      const user = JSON.parse(currentUserRaw);
      const userPetKey = `pet_${user.username.trim().toLowerCase()}`;

      localStorage.setItem(
        userPetKey,
        JSON.stringify({
          pet: selectedPet,
          name: nameToSave,
        })
      );
    } catch (error) {
      console.error('Greška pri čuvanju ljubimca:', error);
    }

    navigate('/dnevna-soba');
  };

  const handleRestartGame = () => {
    setHappiness(3);
    setHunger(3);
    setEquippedAccessory(null);
    setSelectedPet(null);
    setPetName('');
    navigate('/odabir-ljubimca');
  };

  const handleLogoutFromGameOver = () => {
    setHappiness(3);
    setHunger(3);
    setEquippedAccessory(null);
    setSelectedPet(null);
    setPetName('');
    navigate('/logout');
  };

  return (
    <div className="app-container">
      <Zvuk />

      <Routes>
        <Route path="/" element={<Dobrodosli onNavigate={handleNavigate} />} />
        <Route path="/login" element={<Login onNavigate={handleNavigate} />} />
        <Route path="/signup" element={<Signup onNavigate={handleNavigate} />} />
        <Route path="/forgot-password" element={<ForgotPassword onNavigate={handleNavigate} />} />
        
        <Route 
          path="/odabir-ljubimca" 
          element={
            <OdabirLjubimca 
              setSelectedPet={setSelectedPet}
              onNavigate={handleNavigate}
            />
          } 
        />
        
        <Route 
          path="/dodeli-ime" 
          element={
            <DodeliIme 
              selectedPet={selectedPet}
              petName={petName}
              setPetName={setPetName}
              onConfirm={handleConfirmName}
            />
          } 
        />

        <Route 
          path="/dnevna-soba" 
          element={
            <DnevnaSoba 
              selectedPet={selectedPet}
              petName={petName}
              happiness={happiness}
              hunger={hunger}
              setHappiness={setHappiness}
              setHunger={setHunger}
              onNavigate={handleNavigate}
              equippedAccessory={equippedAccessory}
              setEquippedAccessory={setEquippedAccessory}
            />
          } 
        />

        <Route 
          path="/dvoriste" 
          element={
            <Dvoriste 
              selectedPet={selectedPet}
              petName={petName}
              equippedAccessory={equippedAccessory}
              setEquippedAccessory={setEquippedAccessory}
              onNavigate={handleNavigate}
            />
          } 
        />

        <Route 
          path="/game-over" 
          element={
            <GameOver 
              onRestart={handleRestartGame}
              onLogout={handleLogoutFromGameOver}
            />
          } 
        />

        <Route path="/logout" element={<Logout onNavigate={handleNavigate} />} />
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
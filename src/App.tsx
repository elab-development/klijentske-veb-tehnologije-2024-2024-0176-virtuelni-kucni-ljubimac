import { useState, useEffect } from 'react';

import Dobrodosli from './stranice/dobrodosli';
import Login from './stranice/login';
import Signup from './stranice/signup';
import ForgotPassword from './stranice/zaboravljena_lozinka';
import OdabirLjubimca from './stranice/odabir_ljubimca';
import DodeliIme from './stranice/dodeli_ime';
import DnevnaSoba from './stranice/dnevna_soba';
import Dvoriste from './stranice/dvoriste';
import Logout from './stranice/logout';

import Zvuk from './komponente/zvuk';

import './App.css';

interface ILjubimac {
  id: string;
  slika: string;
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<string>('welcome');
  const [selectedPet, setSelectedPet] = useState<ILjubimac | null>(null);
  const [petName, setPetName] = useState<string>('');

  const [happiness, setHappiness] = useState<number>(3);
  const [hunger, setHunger] = useState<number>(3);

  const [equippedAccessory, setEquippedAccessory] = useState<string | null>(null);

  // Učitavanje ulogovanog korisnika i njegovog sačuvanog ljubimca
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
  }, [currentScreen]);

  // Čuvanje izabranog ljubimca i novog imena u localStorage
  const handleConfirmName = (finalName?: string) => {
    const nameToSave = finalName !== undefined ? finalName : petName;

    try {
      const currentUserRaw = localStorage.getItem('currentUser');
      
      if (!currentUserRaw) {
        navigateTo('login');
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

    navigateTo('room');
  };

  const navigateTo = (screen: string) => {
    if (screen === 'odabir_ljubimca' || screen === 'odabir-ljubimca') {
      setCurrentScreen('choose-pet');
    } else if (screen === 'dodeli_ime' || screen === 'dodeli-ime') {
      setCurrentScreen('name-pet');
    } else if (screen === 'dnevna_soba' || screen === 'dnevna-soba') {
      setCurrentScreen('room');
    } else {
      setCurrentScreen(screen);
    }
  };

  return (
    <div className="app-container">
      <Zvuk />

      {currentScreen === 'welcome' && <Dobrodosli onNavigate={navigateTo} />}
      {currentScreen === 'login' && <Login onNavigate={navigateTo} />}
      {currentScreen === 'signup' && <Signup onNavigate={navigateTo} />}
      
      {currentScreen === 'forgot-password' && (
        <ForgotPassword onNavigate={navigateTo} />
      )}

      {currentScreen === 'choose-pet' && (
        <OdabirLjubimca 
          setSelectedPet={setSelectedPet}
          onNavigate={navigateTo}
        />
      )}
      
      {currentScreen === 'name-pet' && (
        <DodeliIme 
          selectedPet={selectedPet}
          petName={petName}
          setPetName={setPetName}
          onConfirm={handleConfirmName}
        />
      )}

      {currentScreen === 'room' && (
        <DnevnaSoba 
          selectedPet={selectedPet}
          petName={petName}
          happiness={happiness}
          hunger={hunger}
          setHappiness={setHappiness}
          setHunger={setHunger}
          onNavigate={navigateTo}
          equippedAccessory={equippedAccessory}
        />
      )}

      {currentScreen === 'outside' && (
        <Dvoriste 
          selectedPet={selectedPet}
          petName={petName}
          equippedAccessory={equippedAccessory}
          setEquippedAccessory={setEquippedAccessory}
          onNavigate={navigateTo}
        />
      )}

      {currentScreen === 'logout' && <Logout onNavigate={navigateTo} />}
    </div>
  );
}
import { useState } from 'react';

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

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<string>('welcome');
  const [selectedPet, setSelectedPet] = useState<string | null>(null);
  const [petName, setPetName] = useState<string>('');

  const [happiness, setHappiness] = useState<number>(3);
  const [hunger, setHunger] = useState<number>(3);

  const [equippedAccessory, setEquippedAccessory] = useState<string | null>(null);

  const navigateTo = (screen: string) => {
    setCurrentScreen(screen);
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
          onSelectPet={(pet: string) => {
            setSelectedPet(pet);
            navigateTo('name-pet');
          }} 
        />
      )}
      {currentScreen === 'name-pet' && (
        <DodeliIme 
          selectedPet={selectedPet}
          petName={petName}
          setPetName={setPetName}
          onConfirm={() => navigateTo('room')}
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
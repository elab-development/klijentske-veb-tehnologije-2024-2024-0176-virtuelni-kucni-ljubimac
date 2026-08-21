interface Props {
    selectedPet: string | null;
    petName: string;
    equippedAccessory: string | null;
    setEquippedAccessory: (acc: string | null) => void;
    onNavigate: (screen: string) => void;
  }
  
  export default function Dvoriste(props: Props) {
    return <div className="page-container">Dvorište</div>;
  }
interface Props {
    selectedPet: string | null;
    petName: string;
    setPetName: (name: string) => void;
    onConfirm: () => void;
  }
  
  export default function DodeliIme({ selectedPet, petName, setPetName, onConfirm }: Props) {
    return <div className="page-container">Dodeli Ime</div>;
  }
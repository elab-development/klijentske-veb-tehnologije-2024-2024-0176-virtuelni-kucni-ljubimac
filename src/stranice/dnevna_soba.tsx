interface Props {
  selectedPet: string | null;
  petName: string;
  happiness: number;
  hunger: number;
  setHappiness: (val: number) => void;
  setHunger: (val: number) => void;
  onNavigate: (screen: string) => void;
  equippedAccessory: string | null;
}

export default function DnevnaSoba(props: Props) {
  return <div className="page-container">Dnevna Soba</div>;
}
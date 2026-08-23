interface Props {
  selectedPet: { id: string; slika: string } | string | null;
  petName: string;
  happiness: number;
  hunger: number;
  setHappiness: (val: number | ((prev: number) => number)) => void;
  setHunger: (val: number | ((prev: number) => number)) => void;
  onNavigate: (screen: string) => void;
  equippedAccessory: string | null;
}

export default function DnevnaSoba(props: Props) {
  return <div className="page-container">Dnevna Soba</div>;
}
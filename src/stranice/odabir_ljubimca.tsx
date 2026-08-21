interface Props {
    onSelectPet: (pet: string) => void;
  }
  
  export default function OdabirLjubimca({ onSelectPet }: Props) {
    return <div className="page-container">Odabir Ljubimca</div>;
  }
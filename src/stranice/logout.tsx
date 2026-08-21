interface Props {
    onNavigate: (screen: string) => void;
  }
  
  export default function Logout({ onNavigate }: Props) {
    return <div className="page-container">Logout</div>;
  }
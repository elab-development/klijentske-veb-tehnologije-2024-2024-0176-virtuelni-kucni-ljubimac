interface Props {
    onNavigate: (screen: string) => void;
  }
  
  export default function Login({ onNavigate }: Props) {
    return <div className="page-container">Login</div>;
  }
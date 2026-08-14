import '../styles/pages-styles/loading.css'
import logo from '../assets/images/logo.png'

export default function LoadingPage() {
  return (
    <div className="loading-pai">
      <img
        src={logo}
        alt="Logo RedeSentinela"
        className="loading-logo"
      />
      <p className="loading-texto">RedeSentinela</p>
    </div>
  );
}


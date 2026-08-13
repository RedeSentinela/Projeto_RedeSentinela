import logo from '../../../assets/image/logo.png'
import './loading.css'

export default function Loading() {
  return (
    <div className="loading-pai">
      <img
        src={logo}
        alt="Logo RedeSentinela"
        className="loading__logo"
      />
      <p className="loading-texto">RedeSentinela</p>
    </div>
  );
}


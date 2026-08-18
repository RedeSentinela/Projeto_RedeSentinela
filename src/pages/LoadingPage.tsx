import { useRedirectAfterDelay } from '../hooks/useRedirectAfterDelay';

import logo from '../assets/images/logo.png'

import '../styles/pages-styles/loading.css'


export default function LoadingPage() {
  useRedirectAfterDelay("/welcome", 1500)

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


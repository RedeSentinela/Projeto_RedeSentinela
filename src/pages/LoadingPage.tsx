// Importação para rotas funcionarem
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import logo from '../assets/images/logo.png'

import '../styles/pages-styles/loading.css'

export default function LoadingPage() {
  const navigate = useNavigate() // função "navigate" criada

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/welcome")
    }, 1500) // tempo que loading fica visível

    return() => clearTimeout(timer)
  }, [navigate]) // faz a navegação para a página desejada

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


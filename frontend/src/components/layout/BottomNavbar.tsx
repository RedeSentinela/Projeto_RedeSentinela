import { useNavigate, useLocation } from 'react-router-dom'
import '../../styles/bottom-navbar.css'
import IconHome from '../icons/IconHome'
import IconSearch from '../icons/IconSearch'
import IconPlus from '../icons/IconPlus'
import IconProfile from '../icons/IconProfile'

export default function BottomNavbar() {
    const navigate = useNavigate();
    const location = useLocation();

    function estaAtivo(rota: string) {
        return location.pathname === rota;
    }

    return (
        <nav className="navbar-pai">
            <button
                className={`navbar-item ${estaAtivo('/home') ? 'navbar-item--ativo' : ''}`}
                onClick={() => navigate('/home')}
            >
                <IconHome />
                <span>Home</span>
            </button>

            <button
                className={`navbar-item ${estaAtivo('/busca') ? 'navbar-item--ativo' : ''}`}
                onClick={() => navigate('/busca')}
            >
                <IconSearch />
                <span>Help</span>
            </button>

            <div className="navbar-item-central-wrapper">
                <button
                    className="navbar-item-central"
                    onClick={() => navigate('/denuncia')}
                    aria-label="Fazer denúncia"
                >
                    <IconPlus />
                </button>
                <span className="navbar-item-central-label">Denúncia</span>
            </div>

            <button
                className={`navbar-item ${estaAtivo('/perfil') ? 'navbar-item--ativo' : ''}`}
                onClick={() => navigate('/perfil')}
            >
                <IconProfile />
                <span>Profile</span>
            </button>
        </nav>
    )
}
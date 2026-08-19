import { useNavigate } from 'react-router-dom'

import '../styles/pages-styles/user-type.css'

import IconUser from '../components/icons/IconUser'
import IconBuilding from '../components/icons/IconBuilding'

export default function UserTypeSelectionPage() {
    const navigate = useNavigate();

    return (
        <div className="tipo-conta-pai">
            <div className="tipo-conta-topo">
                <h1 className="titulo">Para iniciar seu cadastro...</h1>
                <p className="tipo-conta-subtitulo">Como você vai usar esse app?</p>
            </div>

            <div className="tipo-conta-opcoes">
                <button
                    className="tipo-conta-card"
                    onClick={() => navigate('/cadastro/usuario')}
                >
                    <span className="tipo-conta-icone">
                        <IconUser width={48} height={48} />
                    </span>
                    <span className="tipo-conta-textos">
                        <span className="tipo-conta-card-titulo">Usuária comum</span>
                        <span className="tipo-conta-card-subtitulo">
                            Quero apoio e acompanhamento individual
                        </span>
                    </span>
                </button>

                <button
                    className="tipo-conta-card"
                    onClick={() => navigate('/cadastro/organizacao')}
                >
                    <span className="tipo-conta-icone">
                        <IconBuilding width={48} height={48} />
                    </span>
                    <span className="tipo-conta-textos">
                        <span className="tipo-conta-card-titulo">Organização</span>
                        <span className="tipo-conta-card-subtitulo">
                            Represento uma instituição ou coletivo
                        </span>
                    </span>
                </button>
            </div>
        </div>
    )
}
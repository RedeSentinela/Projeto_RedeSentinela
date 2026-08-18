import { useNavigate } from 'react-router-dom'

import '../styles/pages-styles/welcome.css'

export default function WelcomePage() {
    const navigate = useNavigate() // função "navigate" criada

    return (
        <div className="welcome-pai">
            <h1 className="titulo">Você não está sozinha!</h1>
            <p className='subtitulo subtitulo-branco'> Texto de motivação e/ou breve explicação sobre a motivação por trás
                desse aplicativo.
            </p>
            <button className='btn' onClick={() => navigate("/cadastro")}>
                Próximo passo
            </button>
        </div>
    )
}
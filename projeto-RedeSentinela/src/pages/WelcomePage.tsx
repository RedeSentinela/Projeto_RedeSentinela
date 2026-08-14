import '../styles/pages-styles/welcome.css'
import SignupPage from './SignupPage'

interface WelcomePageBtn{
    
}

export default function WelcomePage(){
    return(
        <div className="welcome-pai">
            <h1 className="titulo">Você não está sozinha!</h1>
            <p className='subtitulo subtitulo-branco'> Texto de motivação e/ou breve explicação sobre a motivação por trás
                desse aplicativo. 
            </p>
            <button className='btn' onClick={<SignupPage />}>
                Próximo passo
            </button>
        </div>
    )
}
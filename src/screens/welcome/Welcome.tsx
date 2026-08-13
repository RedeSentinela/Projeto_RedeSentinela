import '../welcome/welcome.css'
import welcomeIMG from '../../../assets/image/welcomeIMG.png'

interface WelcomeScreenProps {
  onNext: () => void;
}

export default function Welcome({ onNext }: WelcomeScreenProps) {
  return (
    <div className="welcome-pai welcome-bg centralizado">
      <img
        src={welcomeIMG}
        alt="iamgem--boas-vindas"
        className="welcome-img"
      />

      <h1 className="titulo-w rs-title--light">
        Você não está sozinha!
      </h1>

      <p className="subtitulo-w">
        Texto de motivação e/ou breve explicação sobre a motivação por trás
        desse aplicativo.
      </p>

      <button className="btn" onClick={onNext}>
        Próximo passo
      </button>
    </div>
  );
}


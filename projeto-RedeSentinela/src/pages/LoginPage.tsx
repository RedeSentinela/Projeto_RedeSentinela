import '../styles/pages-styles/login.css'
import '../styles/panels.css'
import waveIMG from '../assets/images/waveIMG.png'
import Field from '../components/ui/Field'
import IconMail from '../components/icons/IconMail'
import IconUser from '../components/icons/IconUser'
import IconLock from '../components/icons/IconLock'
import IconEye from '../components/icons/IconEye'

export interface SignupFormValues {
    email: string;
    nome: string;
    senha: string;
}

export default function LoginPage() {
    return (
        <div className='login-pai'>

            {/*------- CARD BRANCO -------*/}
            <div className='auth-card auth-card--top'>
                <h1 className='card-titulo'>Vamos lá?</h1>

                <Field
                    icon={<IconMail />}
                    label='Email:'
                    type='email'
                    placeholder='email_exemplo@gmail.com'
                /*value={form.email}
                onChange={updateField("email")}*/
                />

                <Field
                    icon={<IconLock />}
                    label='Senha:'
                    /* type={showPassword ? "text" : "password" */
                    placeholder='••••••••••'
                /* value={form.senha}
                onChange={updateField("senha")}
                
                rightSlot={
                    <button
                    type='button'
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label='Mostrar senha'
                    >
                        <IconEye off={!showPassword} />
                    </button>
                */
                />

                <button className='btn btn--block' /*onClick={() => onSubmit(form)}*/>
                    Entrar 
                </button>

                <p className='switch-text'>
                    Você não tem uma conta?
                    <br /> Então vamos
                    <button className='switch-link' /*onClick={onGoLogin}*/>
                        criar uma nova conta!
                    </button>
                </p>

            </div>

            {/*------- CARD VERDE -------*/}
            <div className='painel-verde painel-verde--login'>

                <div className='painel-filho'>
                    <img
                        src={waveIMG}
                        alt='imagem-boas-vindas'
                        className='login-img'
                    />
                    <div className='painel-grid'>
                        <h1 className='titulo titulo--right'>Olá novamente!</h1>
                        <p className='subtitulo subtitulo--right subtitulo-branco'>
                            Estamos aqui com você!
                        </p>
                    </div>

                </div>
            </div>

        </div>
    )
}
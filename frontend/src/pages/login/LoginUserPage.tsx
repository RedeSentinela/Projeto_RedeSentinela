import { useNavigate } from 'react-router-dom'
import { useForm } from '../../hooks/useForm'

import waveIMG from '../../assets/images/waveIMG.png'

import Field from '../../components/ui/Field'
import IconEye from '../../components/icons/IconEye'
import IconLock from '../../components/icons/IconLock'
import IconMail from '../../components/icons/IconMail'

import '../../styles/pages-styles/loginUser.css'
import '../../styles/panels.css'
import { useTogglePassword } from '../../hooks/useTogglePassword'

export type LoginUserFormValues = {
    email: string;
    senha: string;
}

export default function LoginUserPage() {
    const navigate = useNavigate();
    const { showPassword, toggle } = useTogglePassword(); // mostrar/esconder senha

    const { form, updateField, formValido } = useForm<LoginUserFormValues>({ // guarda valor colocado
        email: "",
        senha: "",
    });

    // função para o botão de "criar conta"
    function onSubmit() {
        console.log("Fazendo login:", form)
        // colocar chamada real pra API/banco de login
        // validar email/senha antes de navegar

        navigate("/home") // depois de criar a conta, entra no app
    }

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
                    value={form.email}
                    onChange={updateField("email")}
                />

                <Field
                    icon={<IconLock />}
                    label='Senha:'
                    type={showPassword ? "text" : "password"}
                    placeholder='••••••••••'
                    value={form.senha}
                    onChange={updateField("senha")}
                    rightSlot={
                        <button
                            type='button'
                            onClick={toggle}
                            aria-label='Mostrar senha'
                        >
                            <IconEye off={!showPassword} />
                        </button>
                    }
                />

                <button 
                    className='btn btn--block' 
                    onClick={onSubmit}
                    disabled={!formValido}>
                        Entrar
                </button>

                <p className='switch-text'>
                    Você não tem uma conta?
                    <br /> Então vamos
                    <button className='switch-link' onClick={() => navigate("/cadastro/usuario")}>
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
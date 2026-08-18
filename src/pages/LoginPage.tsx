import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import waveIMG from '../assets/images/waveIMG.png'

import Field from '../components/ui/Field'
import IconEye from '../components/icons/IconEye'
import IconLock from '../components/icons/IconLock'
import IconMail from '../components/icons/IconMail'

import '../styles/pages-styles/login.css'
import '../styles/panels.css'

export interface LoginFormValues {
    email: string;
    senha: string;
}

export default function LoginPage() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false); // mostrar/esconder senha

    const [form, setForm] = useState<LoginFormValues>({ // guarda valor colocado
        email: "",
        senha: "",
    });

    const formValido = 
    form.email.trim() && 
    form.senha.trim() !== "";

    // função para o botão de "criar conta"
    function onSubmit() {
        console.log("Fazendo login:", form)
        // colocar chamada real pra API/banco de login
        // validar email/senha antes de navegar

        navigate("/home") // depois de criar a conta, entra no app
    }


    // função que gera outras funções; evita escrever uma função de onChange pra cada campo
    function updateField(campo: keyof LoginFormValues) {
        return function (e: React.ChangeEvent<HTMLInputElement>) {
            setForm((formAnterior) => ({
                ...formAnterior, // copia todos os campos que já existiam
                [campo]: e.target.value, // sobrescreve só o campo que mudou
            }))
        }
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
                            onClick={() => setShowPassword((prev) => !prev)}
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
                    <button className='switch-link' onClick={() => navigate("/cadastro")}>
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
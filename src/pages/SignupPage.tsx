import { useNavigate } from 'react-router-dom'
import { useForm } from '../hooks/useForm'
import { useTogglePassword } from '../hooks/useTogglePassword'

import signupIMG from '../assets/images/signupIMG.png'

import Field from '../components/ui/Field'
import IconMail from '../components/icons/IconMail'
import IconUser from '../components/icons/IconUser'
import IconLock from '../components/icons/IconLock'
import IconEye from '../components/icons/IconEye'

import '../styles/pages-styles/signup.css'
import '../styles/panels.css'


export type SignupFormValues = { // formato dos dados do form
    email: string;
    nome: string;
    senha: string;
}

export default function SignupPage() {
    const navigate = useNavigate();
    const { showPassword, toggle } = useTogglePassword(); // mostrar/esconder senha

    const { form, updateField, formValido } = useForm<SignupFormValues>({ // guarda valor colocado
        email: "",
        nome: "",
        senha: "",
    });

    // função para o botão de "criar conta"
    function onSubmit(dados: SignupFormValues) {
        console.log("Cadastrando:", dados)
        // colocar chamada real pra API/banco de cadastro

        navigate("/home") // depois de criar a conta, entra no app
    }


    return (
        <div className='signup-pai'>

            {/*------- CARD VERDE -------*/}
            <div className='painel-verde'>

                <h1 className='titulo titulo--left'>Vamos criar uma nova conta?</h1>
                <div className='painel-filho'>
                    <div>
                        <p className='subtitulo subtitulo--left subtitulo-branco'>
                            Fique tranquila!
                            Seus dados pessoais estarão invisíveis para nós.
                        </p>
                    </div>
                    <img
                        src={signupIMG}
                        alt='imagem-boas-vindas'
                        className='signup-img'
                    />
                </div>
            </div>

            {/*------- CARD BRANCO -------*/}
            <div className='auth-card'>
                <h1 className='card-titulo'>Você só precisa informar...</h1>

                <Field
                    icon={<IconMail />}
                    label='Email:'
                    type='email'
                    placeholder='email_exemplo@gmail.com'
                    value={form.email}
                    onChange={updateField("email")}
                />

                <Field
                    icon={<IconUser />}
                    label='Nome:'
                    type='text'
                    placeholder='Seu nome aqui :)'
                    value={form.nome}
                    onChange={updateField("nome")}
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
                    onClick={() => onSubmit(form)} 
                    disabled={!formValido}>
                        Criar nova conta
                </button>

                <p className='switch-text'>
                    Você já tem uma conta?
                    <br /> Então vamos
                    <button className='switch-link' onClick={() => navigate("/login")}>
                        fazer login!
                    </button>
                </p>

            </div>

        </div>
    )
}
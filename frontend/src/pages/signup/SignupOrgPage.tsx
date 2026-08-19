import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from '../../hooks/useForm'
import { useTogglePassword } from '../../hooks/useTogglePassword'

import '../../styles/pages-styles/signupOrg.css'
import '../../styles/panels.css'

import IconCheck from '../../components/icons/IconCheck'
import Field from '../../components/ui/Field'
import IconBuilding from '../../components/icons/IconBuilding'
import IconFileText from '../../components/icons/IconFileText'
import IconPhone from '../../components/icons/IconPhone'
import IconMail from '../../components/icons/IconMail'
import IconMapPin from '../../components/icons/IconMapPin'
import IconLock from '../../components/icons/IconLock'
import IconEye from '../../components/icons/IconEye'

export type SignupOrgFormValues = {
    nome: string;
    cnpj: string;
    telefone: string;
    emailContato: string;
    endereco: string;
    descServicos: string;
    senha: string;
}

const ETAPAS = [
    { numero: 1, label: "Identificação" },
    { numero: 2, label: "Detalhes" },
    { numero: 3, label: "Confirmação" },
];

export default function SignupOrgPage() {
    const navigate = useNavigate();
    const { form, updateField, formValido } = useForm<SignupOrgFormValues>({
        nome: "",
        cnpj: "",
        telefone: "",
        emailContato: "",
        endereco: "",
        descServicos: "",
        senha: "",
    });
    const { showPassword, toggle } = useTogglePassword();

    const [step, setStep] = useState(1);

    function campoPreenchido(campo: keyof SignupOrgFormValues) {
        return form[campo].trim() !== "";
    }

    function stepValido() {
        if (step === 1) {
            return campoPreenchido("nome") && campoPreenchido("cnpj");
        }
        if (step === 2) {
            return (
                campoPreenchido("telefone") &&
                campoPreenchido("emailContato") &&
                campoPreenchido("endereco")
            );
        }
        return campoPreenchido("senha");
    }

    function proximoStep() {
        if (!stepValido()) return;
        setStep((atual) => Math.min(atual + 1, 3));
    }

    function stepAnterior() {
        setStep((atual) => Math.max(atual - 1, 1));
    }

    function onSubmit() {
        if (!stepValido()) return;
        console.log("Cadastrando organização:", form);

        // TODO: chamada real pra API

        navigate("/home");
    }

    return (
        <div className="signup-org-pai">

            {/*------- PAINEL VERDE -------*/}
            <div className="painel-verde">
                <div className="org-selo">
                    <IconBuilding width={52} height={52} />
                </div>
                <h1 className="titulo">Portal de gestão do parceiro</h1>
                <p className="subtitulo subtitulo-branco subtitulo-signup">
                    Junte-se à nossa rede de acolhimento e ajude a transformar
                    vidas em um ambiente seguro e humanizado.
                </p>
            </div>

            {/*------- CARD BRANCO -------*/}
            <div className="auth-card">
                <h1 className="card-titulo">Cadastro de parceiros</h1>

                {/*------- INDICADOR DE ETAPAS -------*/}
                <div className="steps-indicador">
                    <div className="steps-linha-fundo" />
                    <div
                        className="steps-linha-progresso"
                        style={{ width: `${((step - 1) / (ETAPAS.length - 1)) * (2 / 3) * 100}%` }}
                    />

                    <div className="steps-grid">
                        {ETAPAS.map((etapa) => (
                            <div key={etapa.numero} className="steps-item">
                                <span
                                    className={
                                        "steps-bolinha" +
                                        (step === etapa.numero ? " steps-bolinha--ativa" : "") +
                                        (step > etapa.numero ? " steps-bolinha--concluida" : "")
                                    }
                                >
                                    {step > etapa.numero ? <IconCheck width={14} height={14} /> : etapa.numero}
                                </span>
                                <span
                                    className={
                                        "steps-label" +
                                        (step === etapa.numero ? " steps-label--ativa" : "")
                                    }
                                >
                                    {etapa.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/*------- STEP 1: IDENTIFICAÇÃO -------*/}
                {step === 1 && (
                    <>
                        <Field
                            icon={<IconBuilding />}
                            label="Nome da instituição:"
                            type="text"
                            placeholder="Ex: Instituto Renascer"
                            value={form.nome}
                            onChange={updateField("nome")}
                        />

                        <Field
                            icon={<IconFileText />}
                            label="CNPJ da instituição:"
                            type="text"
                            placeholder="00.000.000/0000-00"
                            value={form.cnpj}
                            onChange={updateField("cnpj")}
                        />
                    </>
                )}

                {/*------- STEP 2: DETALHES -------*/}
                {step === 2 && (
                    <>
                        <Field
                            icon={<IconPhone />}
                            label="Telefone:"
                            type="text"
                            placeholder="(00) 00000-0000"
                            value={form.telefone}
                            onChange={updateField("telefone")}
                        />

                        <Field
                            icon={<IconMail />}
                            label="Email de contato:"
                            type="email"
                            placeholder="contato@instituicao.org"
                            value={form.emailContato}
                            onChange={updateField("emailContato")}
                        />

                        <Field
                            icon={<IconMapPin />}
                            label="Endereço:"
                            type="text"
                            placeholder="Rua, número, bairro, cidade"
                            value={form.endereco}
                            onChange={updateField("endereco")}
                        />
                    </>
                )}

                {/*------- STEP 3: CONFIRMAÇÃO -------*/}
                {step === 3 && (
                    <Field
                        icon={<IconLock />}
                        label="Senha:"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••••"
                        value={form.senha}
                        onChange={updateField("senha")}
                        rightSlot={
                            <button type="button" onClick={toggle} aria-label="Mostrar senha">
                                <IconEye off={!showPassword} />
                            </button>
                        }
                    />
                )}

                {/*------- BOTÕES DE NAVEGAÇÃO -------*/}
                <div className="steps-botoes">
                    {step > 1 && (
                        <button className="btn btn--voltar" onClick={stepAnterior}>
                            Voltar
                        </button>
                    )}

                    {step < 3 && (
                        <button
                            className="btn btn--block"
                            onClick={proximoStep}
                            disabled={!stepValido()}
                        >
                            Próximo
                        </button>
                    )}

                    {step === 3 && (
                        <button
                            className="btn btn--block"
                            onClick={onSubmit}
                            disabled={!stepValido()}
                        >
                            Finalizar cadastro
                        </button>
                    )}
                </div>

                <p className="switch-text">
                    Já tem cadastro?
                    <br /> Então vamos
                    <button className="switch-link" onClick={() => navigate('/login/organizacao')}>
                        fazer login!
                    </button>
                </p>
            </div>
        </div>
    )
}
import { useNavigate } from 'react-router-dom'
import { useForm } from '../../hooks/useForm'
import { useTogglePassword } from '../../hooks/useTogglePassword'

import '../../styles/pages-styles/loginOrg.css'
import '../../styles/panels.css'

import Field from '../../components/ui/Field'
import IconFileText from '../../components/icons/IconFileText'
import IconLock from '../../components/icons/IconLock'
import IconEye from '../../components/icons/IconEye'

export type LoginOrgFormValues = {
    cnpj: string;
    senha: string;
}

export default function LoginOrgPage() {
    const navigate = useNavigate();
    const { form, updateField, formValido } = useForm<LoginOrgFormValues>({
        cnpj: "",
        senha: "",
    });
    const { showPassword, toggle } = useTogglePassword();

    function onSubmit() {
        console.log("Login de organização:", form);
        // TODO: chamada real pra API de login (CNPJ + senha)

        navigate("/home");
    }

    return (
        <div className="login-org-pai">
            <div className="login-org-topo">
                <div className="org-selo">
                    <IconFileText />
                </div>
                <h2 className="org-selo-titulo">Portal de gestão do parceiro</h2>
                <p className="subtitulo">Acesso restrito</p>
                <p className="subtitulo-pequeno">
                    Credenciais administrativas obrigatórias para acesso ao painel de controle.
                </p>
            </div>

            <div className="auth-card auth-card--top">
                <Field
                    icon={<IconFileText />}
                    label="CNPJ da instituição:"
                    type="text"
                    placeholder="00.000.000/0000-00"
                    value={form.cnpj}
                    onChange={updateField("cnpj")}
                />

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

                <button
                    className="btn btn--block"
                    onClick={onSubmit}
                    disabled={!formValido}
                >
                    Autenticar acesso
                </button>

                <p className="switch-text">
                    Nova instituição?
                    <button className="switch-link" onClick={() => navigate('/cadastro/organizacao')}>
                        Solicitar credenciamento
                    </button>
                </p>
            </div>
        </div>
    )
}
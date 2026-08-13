import { useState } from "react";
import '../signup/signup.css'
import signupIMG from '../../../assets/image/signupIMG.png'

import IconMail from "../../components/icons/IconMail";
import IconUser from "../../components/icons/IconUser";
import IconLock from "../../components/icons/IconLock";
import IconEye from "../../components/icons/IconEye";
import Field from "../../components/ui/Field";

export interface SignupFormValues {
  email: string;
  nome: string;
  senha: string;
}

interface SignupScreenProps {
  onGoLogin: () => void;
  onSubmit: (form: SignupFormValues) => void;
}

export default function Signup({ onGoLogin, onSubmit }: SignupScreenProps) {
  const [form, setForm] = useState<SignupFormValues>({ email: "", nome: "", senha: "" });
  const [showPassword, setShowPassword] = useState(false);

  const updateField =
    (key: keyof SignupFormValues) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [key]: event.target.value }));
    };

  return (
    <div className="signup-screen">

      <div className="signup-screen_superior superior-painel superior-painel--top">
        <h1 className="titulo titulo--on-dark titulo--left">Vamos criar uma nova conta?</h1>
        <p className="subtitulo subtitulo--on-dark subtitulo--left">
          Fique tranquila! Seus dados pessoais estarão invisíveis para nós.
        </p>
      </div>

      <div className="auth-card">
        <h2 className="card-titulo">Você só precisa informar…</h2>

        <Field
          icon={<IconMail />}
          label="Email:"
          type="email"
          placeholder="email_exemplo@gmail.com"
          value={form.email}
          onChange={updateField("email")}
        />

        <Field
          icon={<IconUser />}
          label="Nome:"
          type="text"
          placeholder="Seu nome aqui"
          value={form.nome}
          onChange={updateField("nome")}
        />

        <Field
          icon={<IconLock />}
          label="Senha:"
          type={showPassword ? "text" : "password"}
          placeholder="••••••••••"
          value={form.senha}
          onChange={updateField("senha")}
          rightSlot={
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label="Mostrar senha"
            >
              <IconEye off={!showPassword} />
            </button>
          }
        />

        <button className="btn btn--block" onClick={() => onSubmit(form)}>
          Criar nova conta
        </button>

        <p className="switch-text">
          Você já tem uma conta?{" "}
          <button className="switch-link" onClick={onGoLogin}>
            Então vamos fazer login!
          </button>
        </p>
      </div>
    </div>
  );
}

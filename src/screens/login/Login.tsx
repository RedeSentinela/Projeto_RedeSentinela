import { useState } from "react";
import type { ChangeEvent } from "react";
import '../login/login.css'

import IconMail from "../../components/icons/IconMail";
import IconLock from "../../components/icons/IconLock";
import IconEye from "../../components/icons/IconEye";
import Field from "../../components/ui/Field";

interface LoginFormValues {
  email: string;
  senha: string;
}

interface LoginScreenProps {
  onGoSignup: () => void;
  onSubmit: (form: LoginFormValues) => void;
}

export default function LoginScreen({ onGoSignup, onSubmit }: LoginScreenProps) {
  const [form, setForm] = useState<LoginFormValues>({ email: "", senha: "" });
  const [showPassword, setShowPassword] = useState(false);

  const updateField =
    (key: keyof LoginFormValues) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [key]: event.target.value }));
    }; 

  return (
    <div className="login-screen">
      <div className="auth-card auth-card--top">
        <h1 className="card-titulo card-titulo--lg">Vamos lá?</h1>

        <Field
          icon={<IconMail />}
          label="Email:"
          type="email"
          placeholder="email_exemplo@gmail.com"
          value={form.email}
          onChange={updateField("email")}
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
          Entrar
        </button>

        <p className="switch-text">
          Você não tem uma conta?{" "}
          <button className="switch-link" onClick={onGoSignup}>
            Então vamos criar uma nova conta!
          </button>
        </p>
      </div>

      <div className="login-screen__hero superior-painel superior-painel--bottom">
        <h2 className="titulo titulo--right titulo--on-dark">Olá novamente!</h2>
        <p className="subtitulo subtitulo--right subtitulo--on-dark">Estamos aqui com você!</p>
      </div>
    </div>
  );
}
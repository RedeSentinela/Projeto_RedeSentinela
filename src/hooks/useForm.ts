import { useState } from "react";

// Guarda os valores de um formulário. Todos os campos são strings.
export function useForm<T extends Record<string, string>>(valoresIniciais: T) {
  const [form, setForm] = useState<T>(valoresIniciais);

  // No React Native o TextInput devolve o texto direto (onChangeText)
  function updateField(campo: keyof T) {
    return (texto: string) => setForm((anterior) => ({ ...anterior, [campo]: texto }));
  }

  function preenchido(...campos: (keyof T)[]) {
    return campos.every((campo) => form[campo].trim() !== "");
  }

  const formValido = Object.values(form).every((valor) => valor.trim() !== "");

  return { form, updateField, preenchido, formValido };
}

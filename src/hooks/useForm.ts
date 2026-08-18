import { useState } from "react";


/* <T extends Record<string, string>>
é um generic do TS. Siginifica que esse hook funciona com qualquer formato de objeto, 
desde que todos os valores sejam strings (nesse caso) */
export function useForm<T extends Record<string, string>>(valoresIniciais: T) {
    const [form, setForm] = useState<T>(valoresIniciais);

    function updateField(campo: keyof T) {
        return function (e: React.ChangeEvent<HTMLInputElement>) {
            setForm((formAnterior) => ({
                ...formAnterior,
                [campo]: e.target.value,
            }))
        }
    }

    const formValido = Object.values(form).every(
        (valor) => valor.trim() !== ""
    )

    return { form, updateField, formValido}
}
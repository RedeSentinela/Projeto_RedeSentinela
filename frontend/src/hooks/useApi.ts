import { useState } from "react";

export function useApi<T>() {
    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState<string | null>(null);

    async function chamar(url: string, opcoes?: RequestInit): Promise<T | null> {
        setCarregando(true);
        setErro(null);

        try {
            const resposta = await fetch(url, opcoes);
            if (!resposta.ok) throw new Error("Erro na requisição");
            const dados: T = await resposta.json();
            return dados
        } catch (err) {
            setErro("Algo deu errado. Tente novamente.");
            return null;
        } finally {
            setCarregando(false)
        }
    }

    return { chamar, carregando, erro }
}
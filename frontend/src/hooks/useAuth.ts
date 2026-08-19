import { useState, useEffect } from "react";

export function useAuth() {
    const [autenticado, setAutenticado] = useState(false);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        setAutenticado(!!token);
        setCarregando(false);
    }, []);

    function login(token: string) {
        localStorage.setItem("token", token);
        setAutenticado(true);
    }

    function logout() {
        localStorage.removeItem("token");
        setAutenticado(false);
    }

    return { autenticado, carregando, login, logout }
}
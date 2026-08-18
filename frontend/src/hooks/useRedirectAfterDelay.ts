import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function useRedirectAfterDelay(rota: string, delay: number = 1500) {
    const navigate = useNavigate(); // função "navigate" criada

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate(rota);
        }, delay);

        return () => clearTimeout(timer); 
    }, [navigate, rota, delay]); // faz a navegação para a página desejada
}
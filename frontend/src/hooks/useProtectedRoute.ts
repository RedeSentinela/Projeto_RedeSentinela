// protege a home page de acessos antes do login ou cadastro

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";

export function useProtectedRoute(){
    const { autenticado, carregando } = useAuth();
    const navigate = useNavigate();
    
    useEffect(() => {
        if (!carregando && !autenticado) {
            navigate("/login");
        }
    }, [autenticado, carregando, navigate])

    return { carregando }
}

/* ------ USO NA HOME PAGE ------
export default function HomePage() {
    const { carregando } = useProtectedRoute();

    if (carregando) return <div>Carregando...</div>;

    return <div>Conteúdo da home aqui</div>;
}
*/
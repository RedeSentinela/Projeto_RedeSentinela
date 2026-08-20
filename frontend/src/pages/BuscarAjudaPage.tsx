import { useState } from 'react'
import '../styles/pages-styles/buscar-ajuda.css'
import IconMapPin from '../components/icons/IconMapPin'
import IconSearch from '../components/icons/IconSearch'
import IconBuilding from '../components/icons/IconBuilding'

type ResultadoBusca = {
    id: number;
    nome: string;
    endereco: string;
    distanciaKm: number;
    descServicos: string;
}

// dados de exemplo MOKADOS  — depois substituímos por uma chamada real à API
const RESULTADOS_MOCK: ResultadoBusca[] = [
    {
        id: 1,
        nome: "Casa da Mulher",
        endereco: "Rua Carlos Guimarães, 321",
        distanciaKm: 1.2,
        descServicos: "Apoio jurídico e psicológico para mulheres",
    },
    {
        id: 2,
        nome: "Casa da Mulher",
        endereco: "Rua Carlos Guimarães, 321",
        distanciaKm: 1.2,
        descServicos: "Apoio jurídico e psicológico para mulheres",
    },
];

export default function BuscarAjudaPage() {
    const [bairro, setBairro] = useState("");
    const [resultados, setResultados] = useState<ResultadoBusca[]>(RESULTADOS_MOCK);

    function buscar() {
        console.log("Buscando por bairro:", bairro);
        // TODO: chamada real pra API, algo como:
        // const dados = await chamar(`/api/organizacoes?bairro=${bairro}`);
        // setResultados(dados);
    }

    return (
        <div className="busca-pai">
            <h1 className="busca-titulo">Busque Ajuda</h1>

            <div className="busca-hero">
                <h2 className="busca-hero-titulo">Encontre apoio perto de você</h2>
                <p className="busca-hero-texto">
                    Conectamos você a uma rede segura de ONGs e profissionais especializados
                </p>
            </div>

            <div className="busca-input-linha">
                <div className="busca-input-box">
                    <IconMapPin />
                    <input
                        type="text"
                        placeholder="Digite seu Bairro"
                        value={bairro}
                        onChange={(e) => setBairro(e.target.value)}
                    />
                </div>
                <button className="busca-botao" onClick={buscar}>
                    <IconSearch width={16} height={16} />
                    Buscar
                </button>
            </div>

            <h3 className="busca-secao-titulo">Próximos a você:</h3>

            <div className="busca-lista">
                {resultados.map((resultado) => (
                    <div key={resultado.id} className="busca-card">
                        <div className="busca-card-icone">
                            <IconBuilding width={24} height={24} />
                        </div>
                        <div className="busca-card-conteudo">
                            <div className="busca-card-topo">
                                <span className="busca-card-nome">{resultado.nome}</span>
                                <span className="busca-card-distancia">{resultado.distanciaKm} km</span>
                            </div>
                            <p className="busca-card-endereco">{resultado.endereco}</p>
                            <p className="busca-card-desc">{resultado.descServicos}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
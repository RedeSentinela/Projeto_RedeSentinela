export const API_URL = process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:3000";
console.log("API_URL =", API_URL);

// o token fica na memória (some ao fechar o app)
let token: string | null = null;

export function salvarToken(novo: string | null) {
  token = novo;
}

export async function api<T>(caminho: string, opcoes: { method?: string; body?: object } = {}): Promise<T> {
  let resp: Response;
  try {
    resp = await fetch(`${API_URL}${caminho}`, {
      method: opcoes.method ?? (opcoes.body ? "POST" : "GET"),
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: opcoes.body ? JSON.stringify(opcoes.body) : undefined,
    });
  } catch {
    throw new Error("Sem conexão com o servidor. Confira se o backend está rodando.");
  }

  if (resp.status === 204) return undefined as T; // respostas sem conteúdo (ex: apagar)
  const dados = await resp.json().catch(() => ({}));
  if (!resp.ok) throw new Error(dados.erro ?? "Algo deu errado. Tente de novo.");
  return dados as T;
}


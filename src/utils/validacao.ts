// Regras de validação usadas em todos os logins e cadastros.
// Cada função devolve a mensagem de erro, ou "" quando está tudo certo.

export const soDigitos = (texto: string) => texto.replace(/\D/g, "");

// ---------- máscaras (formatam enquanto a pessoa digita) ----------

export function mascaraCnpj(texto: string) {
  const d = soDigitos(texto).slice(0, 14);
  return d
    .replace(/^(\d{2})(\d)/, "$1.$2")
    .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1/$2")
    .replace(/(\d{4})(\d)/, "$1-$2");
}

export function mascaraTelefone(texto: string) {
  const d = soDigitos(texto).slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : "";
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

// ---------- validações ----------

export function erroEmail(email: string) {
  if (!email.trim()) return "Informe o email.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) return "Email inválido. Ex: nome@gmail.com";
  return "";
}

export function erroCnpj(cnpj: string) {
  const d = soDigitos(cnpj);
  if (!d) return "Informe o CNPJ.";
  if (d.length !== 14) return `O CNPJ tem 14 números (você digitou ${d.length}).`;
  return "";
}

export function erroTelefone(tel: string) {
  const d = soDigitos(tel);
  if (!d) return "Informe o telefone.";
  if (d.length < 10 || d.length > 11) return "Telefone com DDD: 10 ou 11 números.";
  return "";
}

export function erroSenha(senha: string, cadastro = false) {
  if (!senha) return "Informe a senha.";
  if (cadastro && senha.length < 6) return "A senha precisa ter pelo menos 6 caracteres.";
  return "";
}

export function erroObrigatorio(valor: string, nomeCampo: string, minimo = 2) {
  if (!valor.trim()) return `Informe ${nomeCampo}.`;
  if (valor.trim().length < minimo) return `Muito curto. Confira ${nomeCampo}.`;
  return "";
}

export function erroUf(uf: string) {
  if (!uf.trim()) return "Informe a UF.";
  if (!/^[A-Za-z]{2}$/.test(uf.trim())) return "UF tem 2 letras. Ex: SP";
  return "";
}

// true quando nenhuma mensagem de erro foi gerada
export const semErros = (erros: Record<string, string>) => Object.values(erros).every((e) => !e);
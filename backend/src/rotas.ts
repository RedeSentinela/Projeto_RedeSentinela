import { Router } from "express";
import bcrypt from "bcryptjs";
import { db } from "./db";
import { gerarToken, exigirLogin, loginOpcional, type Sessao } from "./auth";

export const rotas = Router();

function faltando(body: Record<string, unknown>, campos: string[]) {
  return campos.filter((c) => typeof body[c] !== "string" || !(body[c] as string).trim());
}

rotas.post("/auth/usuario/cadastro", async (req, res) => {
  const vazios = faltando(req.body, ["email", "nome", "senha"]);
  if (vazios.length) return void res.status(400).json({ erro: `Preencha: ${vazios.join(", ")}` });

  const { email, nome, senha } = req.body;
  const hash = await bcrypt.hash(senha, 10);

  const cliente = await db.connect();
  try {
    await cliente.query("BEGIN");
    const conta = await cliente.query(
      "INSERT INTO conta (tipo_conta_id, email, senha_hash) VALUES (1, $1, $2) RETURNING conta_id",
      [email.trim().toLowerCase(), hash]
    );
    const usuario = await cliente.query(
      "INSERT INTO usuario (conta_id, nome) VALUES ($1, $2) RETURNING usuario_id, nome",
      [conta.rows[0].conta_id, nome.trim()]
    );
    await cliente.query("COMMIT");

    const u = usuario.rows[0];
    const token = gerarToken({ contaId: conta.rows[0].conta_id, tipo: "usuario", id: u.usuario_id });
    res.status(201).json({ token, usuario: { id: u.usuario_id, nome: u.nome } });
  } catch (e) {
    await cliente.query("ROLLBACK");
    throw e;
  } finally {
    cliente.release();
  }
});

rotas.post("/auth/usuario/login", async (req, res) => {
  const vazios = faltando(req.body, ["email", "senha"]);
  if (vazios.length) return void res.status(400).json({ erro: `Preencha: ${vazios.join(", ")}` });

  const r = await db.query(
    `SELECT c.conta_id, c.senha_hash, u.usuario_id, u.nome
       FROM conta c JOIN usuario u ON u.conta_id = c.conta_id
      WHERE c.email = $1`,
    [req.body.email.trim().toLowerCase()]
  );
  const linha = r.rows[0];
  if (!linha || !(await bcrypt.compare(req.body.senha, linha.senha_hash))) {
    return void res.status(401).json({ erro: "Email ou senha incorretos." });
  }
  const token = gerarToken({ contaId: linha.conta_id, tipo: "usuario", id: linha.usuario_id });
  res.json({ token, usuario: { id: linha.usuario_id, nome: linha.nome } });
});
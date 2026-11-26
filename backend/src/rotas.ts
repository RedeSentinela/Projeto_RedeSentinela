import { Router } from "express";
import bcrypt from "bcryptjs";
import { db } from "./db";
import { gerarToken, exigirLogin, loginOpcional, type Sessao } from "./auth";

export const rotas = Router();
const TIPO_USUARIA = 1;
const TIPO_ORGANIZACAO = 2;

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

/* ===================== ORGANIZAÇÃO ===================== */

rotas.post("/auth/organizacao/cadastro", async (req, res) => {
  const obrigatorios = ["nome", "cnpj", "telefone", "emailContato", "endereco", "senha"];
  const vazios = faltando(req.body, obrigatorios);
  if (vazios.length) return void res.status(400).json({ erro: `Preencha: ${vazios.join(", ")}` });

  const { nome, cnpj, telefone, emailContato, endereco, senha } = req.body;
  const hash = await bcrypt.hash(senha, 10);

  const cliente = await db.connect();
  try {
    await cliente.query("BEGIN");
    const conta = await cliente.query(
      "INSERT INTO conta (tipo_conta_id, senha_hash) VALUES ($1, $2) RETURNING conta_id",
      [TIPO_ORGANIZACAO, hash]
    );
    const org = await cliente.query(
      `INSERT INTO organizacao (conta_id, nome, cnpj, telefone, email_contato, endereco)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING organizacao_id, nome`,
      [conta.rows[0].conta_id, nome.trim(), cnpj.trim(), telefone.trim(), emailContato.trim(), endereco.trim()]
    );
    await cliente.query("COMMIT");

    const o = org.rows[0];
    const token = gerarToken({ contaId: conta.rows[0].conta_id, tipo: "organizacao", id: o.organizacao_id });
    res.status(201).json({ token, organizacao: { id: o.organizacao_id, nome: o.nome } });
  } catch (e) {
    await cliente.query("ROLLBACK");
    throw e;
  } finally {
    cliente.release();
  }
});

rotas.post("/auth/organizacao/login", async (req, res) => {
  const vazios = faltando(req.body, ["cnpj", "senha"]);
  if (vazios.length) return void res.status(400).json({ erro: `Preencha: ${vazios.join(", ")}` });

  const r = await db.query(
    `SELECT c.conta_id, c.senha_hash, o.organizacao_id, o.nome
       FROM organizacao o JOIN conta c ON c.conta_id = o.conta_id
      WHERE o.cnpj = $1 AND o.ativo`,
    [req.body.cnpj.trim()]
  );
  const linha = r.rows[0];
  if (!linha || !(await bcrypt.compare(req.body.senha, linha.senha_hash))) {
    return void res.status(401).json({ erro: "CNPJ ou senha incorretos." });
  }
  const token = gerarToken({ contaId: linha.conta_id, tipo: "organizacao", id: linha.organizacao_id });
  res.json({ token, organizacao: { id: linha.organizacao_id, nome: linha.nome } });
});

// GET /organizacoes?bairro=itaquera  (procura no bairro e no endereço)
rotas.get("/organizacoes", async (req, res) => {
  const termo = `%${String(req.query.bairro ?? "").trim()}%`;
  const r = await db.query(
    `SELECT organizacao_id AS id, nome, endereco, desc_servicos AS "descServicos"
       FROM organizacao
      WHERE ativo AND (bairro ILIKE $1 OR endereco ILIKE $1)
      ORDER BY nome LIMIT 50`,
    [termo]
  );
  res.json(r.rows);
});

rotas.get("/contatos", exigirLogin("usuario"), async (_req, res) => {
  const { id } = res.locals.sessao as Sessao;
  const r = await db.query(
    "SELECT contato_id AS id, nome, telefone, relacao FROM contato_emergencia WHERE usuario_id = $1 ORDER BY nome",
    [id]
  );
  res.json(r.rows);
});

rotas.post("/contatos", exigirLogin("usuario"), async (req, res) => {
  const vazios = faltando(req.body, ["nome", "telefone"]);
  if (vazios.length) return void res.status(400).json({ erro: `Preencha: ${vazios.join(", ")}` });

  const { id } = res.locals.sessao as Sessao;
  const r = await db.query(
    `INSERT INTO contato_emergencia (usuario_id, nome, telefone, relacao)
     VALUES ($1, $2, $3, $4) RETURNING contato_id AS id, nome, telefone, relacao`,
    [id, req.body.nome.trim(), req.body.telefone.trim(), req.body.relacao?.trim() || null]
  );
  res.status(201).json(r.rows[0]);
});

rotas.delete("/contatos/:id", exigirLogin("usuario"), async (req, res) => {
  const { id } = res.locals.sessao as Sessao;
  // só apaga se o contato for da própria usuária
  const r = await db.query("DELETE FROM contato_emergencia WHERE contato_id = $1 AND usuario_id = $2", [
    Number(req.params.id),
    id,
  ]);
  if (!r.rowCount) return void res.status(404).json({ erro: "Contato não encontrado." });
  res.status(204).end();
});

// login opcional: sem token, o relato fica anônimo
rotas.post("/registros", loginOpcional, async (req, res) => {
  if (faltando(req.body, ["descricao"]).length) {
    return void res.status(400).json({ erro: "Descreva o que aconteceu." });
  }
  const sessao = res.locals.sessao as Sessao | null;
  const usuarioId = sessao?.tipo === "usuario" ? sessao.id : null;
  const r = await db.query(
    `INSERT INTO registro_seguro (usuario_id, descricao, local, tem_anexo)
     VALUES ($1, $2, $3, $4) RETURNING registro_id AS id, criado_em AS "criadoEm"`,
    [usuarioId, req.body.descricao.trim(), req.body.local?.trim() || null, req.body.temAnexo === true]
  );
  res.status(201).json(r.rows[0]);
});

// GET /analise?dias=30 -> números dos cards e do gráfico
rotas.get("/analise", exigirLogin("organizacao"), async (req, res) => {
  const dias = Math.min(Math.max(Number(req.query.dias) || 30, 1), 365);

  const [total, area, unidades, regioes] = await Promise.all([
    db.query("SELECT COUNT(*)::int AS n FROM ocorrencia WHERE data >= CURRENT_DATE - $1::int", [dias]),
    db.query(
      `SELECT cidade, uf, zona, COUNT(*)::int AS n FROM ocorrencia
        WHERE data >= CURRENT_DATE - $1::int
        GROUP BY cidade, uf, zona ORDER BY n DESC LIMIT 1`,
      [dias]
    ),
    db.query("SELECT COUNT(*)::int AS n FROM organizacao WHERE ativo"),
    db.query(
      `SELECT regiao, COUNT(*)::int AS quantidade FROM ocorrencia
        WHERE data >= CURRENT_DATE - $1::int
        GROUP BY regiao ORDER BY quantidade DESC`,
      [dias]
    ),
  ]);

  const a = area.rows[0];
  res.json({
    totalOcorrencias: total.rows[0].n,
    areaMaisVulneravel: a ? { cidade: a.cidade, uf: a.uf, zona: a.zona } : null,
    unidadesAtivas: unidades.rows[0].n,
    porRegiao: regioes.rows,
  });
});
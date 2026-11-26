import express from "express";
import cors from "cors";
import { db } from "./db";
import { rotas } from "./rotas";

const app = express();
app.use(cors());
app.use(express.json());

// teste: GET /health -> diz se o banco respondeu
app.get("/health", async (_req, res) => {
  const r = await db.query("SELECT now()");
  res.json({ ok: true, hora_do_banco: r.rows[0].now });
});

app.use(rotas);

// erros das rotas caem aqui (o Express 5 já manda os erros de funções async)
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  if (err?.code === "23505") {
    // valor repetido numa coluna UNIQUE (email ou CNPJ já cadastrado)
    res.status(409).json({ erro: "Esse email ou CNPJ já está cadastrado." });
    return;
  }
  console.error(err);
  res.status(500).json({ erro: "Erro no servidor. Tente de novo." });
});

// Busque Ajuda: GET /organizacoes?bairro=itaquera
app.get("/organizacoes", async (req, res) => {
  const bairro = String(req.query.bairro ?? "");
  const r = await db.query(
    "SELECT organizacao_id, nome, endereco, desc_servicos FROM organizacao WHERE ativo AND bairro ILIKE $1",
    [`%${bairro}%`] // $1 evita SQL injection, nunca concatene texto na query
  );
  res.json(r.rows);
});

app.listen(Number(process.env.PORT) || 3000, "0.0.0.0", () =>
  console.log("API rodando na porta", process.env.PORT || 3000)
);
import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export type Sessao = { contaId: number; tipo: "usuario" | "organizacao"; id: number };

export function gerarToken(sessao: Sessao) {
  return jwt.sign(sessao, process.env.JWT_SECRET!, { expiresIn: "7d" });
}

function lerToken(req: Request): Sessao | null {
  const header = req.headers.authorization ?? "";
  if (!header.startsWith("Bearer ")) return null;
  try {
    return jwt.verify(header.slice(7), process.env.JWT_SECRET!) as Sessao;
  } catch {
    return null; // token falso ou vencido
  }
}

export function exigirLogin(tipo: Sessao["tipo"]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const sessao = lerToken(req);
    if (!sessao || sessao.tipo !== tipo) {
      res.status(401).json({ erro: "Faça login para continuar." });
      return;
    }
    res.locals.sessao = sessao; // a rota lê daqui quem está logado
    next();
  };
}

export function loginOpcional(req: Request, res: Response, next: NextFunction) {
  res.locals.sessao = lerToken(req);
  next();
}


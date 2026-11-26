import { Pool } from "pg";
import path from "path";
import dotenv from "dotenv";

// lê o backend/.env, não importa de qual pasta você rodou o comando
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const url = process.env.DATABASE_URL;
if (!url) throw new Error("DATABASE_URL não encontrado: confira o arquivo backend/.env");
console.log("Conectando em:", new URL(url).host); // deve aparecer ...pooler.supabase.com:5432

export const db = new Pool({
  connectionString: url,
  ssl: { rejectUnauthorized: false },
});
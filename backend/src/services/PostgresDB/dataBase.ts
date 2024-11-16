import PgPromise from 'pg-promise'
import dotenv from "dotenv"

dotenv.config()

const pgp = PgPromise()
const usuario = "prog";
const senha = "uffs";
// const db = pgp(`postgres://${usuario}:${senha}@172.20.66.230:5432/prog`);
export const database = pgp({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || ""),
    database: process.env.DB_DATABASE,
    user:  process.env.DB_USER,
    password: process.env.DB_PASSWORD
})
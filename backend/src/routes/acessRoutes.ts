import { Router } from "express";

const acessRoutes = Router()

acessRoutes.post("/", (req, res) => {
    res.status(200).send("Acesso autorizado")
})

export { acessRoutes }
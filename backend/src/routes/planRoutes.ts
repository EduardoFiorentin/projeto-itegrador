import { Router } from "express";

const planRoutes = Router()

planRoutes.post("/", (req, res) => {
    res.status(200).send("Novo plano de contratação cadastrado")
})

planRoutes.get("/", (req, res) => {
    res.status(200).send("Planos de contratação")
})

planRoutes.get("/:name", (req, res) => {
    res.status(200).send("Plano de contratação com nome")
})

export { planRoutes }
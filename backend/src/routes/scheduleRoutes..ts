import { Router } from "express";

const scheduleRoutes = Router()

scheduleRoutes.post("/", (req, res) => {
    res.status(200).send("Novo horario criado")
})

scheduleRoutes.get("/", (req, res) => {
    res.status(200).send("Lista de horarios retornados")
})

scheduleRoutes.get("/:id", (req, res) => {
    res.status(200).send("Horário id retornado")
})


export { scheduleRoutes }
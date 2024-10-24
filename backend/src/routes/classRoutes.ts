import { Router } from "express";

const classRouter = Router()

classRouter.post("/new", (req, res) => {
    res.status(200).send("Nova aula cadastrada")
})

classRouter.get("/", (req, res) => {
    res.status(200).send("Lista de aulas retornada")
})

// solicitação de agendamento de aulas
classRouter.post("/subscribe-group", (req, res) => {
    res.status(200).send("Inscrição concluída")
})

classRouter.post("/request-personal", (req, res) => {
    res.status(200).send("Solicitação de agendamento de aula enviada")
})

classRouter.post("/confirm-class", (req, res) => {
    res.status(200).send("Solicitação de agendamento aceita")
})

classRouter.post("/reject-class", (req, res) => {
    res.status(200).send("Solicitação de agendamento recusada")
})

// Aulas que usam id 
classRouter.get("/:id", (req, res) => {
    res.status(200).send("Aula com id retornada")
})

classRouter.get("/participants/:id", (req, res) => {
    res.status(200).send("Lista de participantes da aula id retornada")
})

export { classRouter }
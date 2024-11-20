import { Router } from "express";
import { scheduleController } from "../controllers";

const scheduleRoutes = Router()

scheduleRoutes.post("/getbyday", scheduleController.getAllByDay.getAllByDay)

scheduleRoutes.get("/", (req, res) => {
    res.status(200).send("Lista de horarios retornados")
})

scheduleRoutes.get("/:id", (req, res) => {
    res.status(200).send("Horário id retornado")
})


export { scheduleRoutes }
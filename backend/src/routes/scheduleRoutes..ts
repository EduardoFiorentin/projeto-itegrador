import { Router } from "express";
import { scheduleController } from "../controllers";
import { requireJWTAuth } from "../services/AuthService";

const scheduleRoutes = Router()

scheduleRoutes.post("/getbyday", // limitar acesso para secretárias e funcionários
    requireJWTAuth, 
    scheduleController.getAllByDay.getAllByDay
)

scheduleRoutes.post("/getFreeSchedulesByDate", 
    requireJWTAuth,
    scheduleController.getFreeSchedulesByDate.getFreeSchedulesByDateValidate,
    scheduleController.getFreeSchedulesByDate.getFreeSchedulesByDate
)

scheduleRoutes.get("/:id", (req, res) => {
    res.status(200).send("Horário id retornado")
})


export { scheduleRoutes }
import { Router } from "express";
import { requireJWTAuth } from "../services/AuthService";
import { PlansController } from "../controllers";

const planRoutes = Router()

planRoutes.post("/", (req, res) => {
    res.status(200).send("Novo plano de contratação cadastrado")
})

planRoutes.get("/getall", 
    requireJWTAuth,
    PlansController.GetAll.getAllValidate,
    PlansController.GetAll.getAll
)

planRoutes.post("/contract", 
    requireJWTAuth,
    PlansController.Contract.contractPlanValidate,
    PlansController.Contract.contractPlan
)

// planRoutes.get("/:name", (req, res) => {
//     res.status(200).send("Plano de contratação com nome")
// })

export { planRoutes }
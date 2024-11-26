import { Router } from "express";
import { requireJWTAuth } from "../services/AuthService";
import { GroupClassesController } from "../controllers";
import { RequestClassesController } from "../controllers/requestClassesController";
import { modalityController } from "../controllers/modalityController";

const modalityRoutes = Router()

modalityRoutes.get("/getall", 
    requireJWTAuth,
    modalityController.getAll.getAllValidate,
    modalityController.getAll.getAll
)

export { modalityRoutes }
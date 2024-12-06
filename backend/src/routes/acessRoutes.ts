import { NextFunction, Request, Response, Router } from "express";
import { StatusCodes } from "http-status-codes";
import { AcessController } from "../controllers/acessController";

const acessRoutes = Router()

acessRoutes.post("/",
    AcessController.Access.accessValidate,
    AcessController.Access.access
)

export { acessRoutes }
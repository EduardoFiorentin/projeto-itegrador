import { Router, Request, Response } from "express";
import { userController } from "../controllers/userControllers";
import { StatusCodes } from "http-status-codes";

const authRouter = Router()


authRouter.post("/login", userController.acessController)

authRouter.post("/recover", (req, res) => {
    res.status(200).send("Codigo de recuperação enviado por e-mail")
})

authRouter.post("/recover-auth", (req, res) => {
    res.status(200).send("Codigo de verificação autenticado")
})

authRouter.post("/reset", (req, res) => {
    res.status(200).send("Senha alterada")
})

export { authRouter }
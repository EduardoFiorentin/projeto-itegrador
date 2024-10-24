import { Router } from "express";

const authRouter = Router()

authRouter.post("/login", (req, res) => {
    res.status(200).send("Login efetuado")
})

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
import { NextFunction, Request, Response, Router } from "express";

const acessRoutes = Router()

// const validation = (req: Request, res: Response, next: NextFunction) => {
//     console.log("Validação")
//     next()
// }

// acessRoutes.post("/", validation, (req, res) => {
//     res.status(200).send("Acesso autorizado")
// })

acessRoutes.post("/",  (req, res) => {
    res.status(200).send("Acesso liberado")
    // res.status(400).send("Acesso negado")
})

export { acessRoutes }
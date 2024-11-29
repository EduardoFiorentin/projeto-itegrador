import { NextFunction, Request, Response, Router } from "express";
import { StatusCodes } from "http-status-codes";
import { AcessController } from "../controllers/acessController";

const acessRoutes = Router()

// const validation = (req: Request, res: Response, next: NextFunction) => {
//     console.log("Validação")
//     next()
// }

// acessRoutes.post("/", validation, (req, res) => {
//     res.status(200).send("Acesso autorizado")
// })

acessRoutes.post("/",
    AcessController.Access.accessValidate,
    AcessController.Access.access
    // (req: Request, res: Response) => {
    //     console.log("Acesso...")
    //     res.status(200).send()
    // }
)

export { acessRoutes }
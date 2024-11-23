import { NextFunction, Request, Response, Router } from "express";
import { StatusCodes } from "http-status-codes";

const acessRoutes = Router()

// const validation = (req: Request, res: Response, next: NextFunction) => {
//     console.log("Validação")
//     next()
// }

// acessRoutes.post("/", validation, (req, res) => {
//     res.status(200).send("Acesso autorizado")
// })

acessRoutes.post("/",  (req, res) => {

    console.log(req.body.codigo)

    if (req.body.codigo == "648e6ad") {
        res.status(StatusCodes.OK).send("ok")
    
       
            // res.status(200).send("Acesso liberado")
        // res.status(400).send("Acesso negado")
    }
    else {
        res.status(StatusCodes.UNAUTHORIZED).send("not")
    } 

})

export { acessRoutes }
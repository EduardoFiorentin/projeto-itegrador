import { Request, Response } from "express";
import {StatusCodes} from "http-status-codes"
import { sendMail } from "../../services";



export const acessController = async (req: Request, res: Response) => {
    try {

        const { email, senha } = req.body
        console.log(email, senha)
        // chamada do banco 

        const acessToken = "acesstokenjwt"
        const code = 15474

        await sendMail(
            "Nobre Arte <eduardoviniciusforentin@gmail.com>",
            "eduardofiorentin336@gmail.com",
            "Recuperação de senha",

            `<h1>Recuperar sua senha</h1>
            </br>
            <p>Utilize o seguinte código para recuperar sua senha: <strong>${code}</strong> </p> 
            </br> 
            <p style="color: red;">ATENÇÃO! Não compartilhe este código com ninguém!</p>`
        )

        res.status(StatusCodes.OK).json({acessToken})

    }
    catch (err) {
        console.log(err)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: "Erro interno. Tente novamente mais tarde."})
    
    }

}
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes"
import jwt from "jsonwebtoken"
import { IUser } from "../../Interfaces/IUser";
import dotenv from 'dotenv'

dotenv.config()

export const signInValidations = (req: Request, res: Response, next: NextFunction) => { 
    
    const {email, password} = req.body

    if (!email || !password) 
        res.status(StatusCodes.BAD_REQUEST).send("Dados inválidos!")
    else next()

}

export const signIn = async (req: Request, res: Response) => {
    try {

        const user = req.user as IUser

		const token = jwt.sign({ role: user.role, name: user.name, email: user.email}, "your-secret-key", {
			expiresIn: "7d",
		});

		res.status(StatusCodes.OK).json({ email: user?.email, name: user.name, role: user.role, token });

    }
    catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: "Erro interno. Tente novamente mais tarde."})
    }

}
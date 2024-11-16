import { Router, Request, Response } from "express";
import { userController } from "../controllers/userControllers";
import { StatusCodes } from "http-status-codes";
import passport from "passport";
import { requireJWTAuth } from "../services/AuthService";

const authRouter = Router()


authRouter.post("/login", 
    passport.authenticate("local", { session: false }),
    // userController.SignIn.signInValidations, 
    userController.SignIn.signIn
)

// Rota para solicitação do codigo de recuperação 
authRouter.post("/recover", 
    userController.GenerateChangeCode.generateCode
)

// Rota de autenticação do codigo enviado ao cliente
authRouter.post("/recover-auth", 
    requireJWTAuth, 
    userController.RecoverPassword.recoverPasswordValidate,
    userController.RecoverPassword.recoverPassword
    
)

// Rota de reset da senha 
authRouter.post("/change-pass",
    requireJWTAuth, 
    userController.ChangePassword.changePasswordValidate, 
    userController.ChangePassword.changePassword
)

export { authRouter }
import express, { Request, Response } from "express";
import session from "express-session";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import bcrypt from "bcrypt";
import { IUser } from "./Interfaces/IUser"
import { authRouter, classRouter, planRoutes, scheduleRoutes, userRouter, acessRoutes } from "./routes"
import { authServiceConfig, requireJWTAuth } from "./services/AuthService";
import { database } from "./services/PostgresDB";
import cors from "cors"


declare global {
    namespace Express {
        interface User extends IUser {}
    }
}
const app = express()
app.use(express.json())
app.use(cors())

app.use(
	session({
		secret: 'alguma_frase_muito_doida_pra_servir_de_SECRET',
		resave: false,
		saveUninitialized: false,
		cookie: { secure: true },
	}),
);
app.use(passport.initialize());
app.use(passport.session());

authServiceConfig()


app.use("/user", userRouter)
app.use("/auth", authRouter)
app.use("/plans", planRoutes)
app.use("/classes", classRouter)
app.use("/schedules", scheduleRoutes)
app.use("/acess", acessRoutes)

app.use("/admin/new-user", requireJWTAuth, async (req: Request, res: Response) => {

	try {

		const { name, cpf, email, password, role } = req.body
	
		const salt = bcrypt.genSaltSync(10);
		const hashedPasswd = bcrypt.hashSync(password, salt);
	
		database.none("insert into users(name, cpf, email, password, role) values ($1, $2, $3, $4, $5)", [name, cpf, email, hashedPasswd, role])
	
		res.status(200).send("Usuário cadastrado") 
	} 
	catch (err) {
		res.status(400).send("Usuário não cadastrado")
	}

})

 


export { app }
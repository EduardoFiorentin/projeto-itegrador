import express from "express";
import session from "express-session";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import bcrypt from "bcrypt";
import { IUser } from "../../Interfaces/IUser";
import { database } from "../PostgresDB";

export function authServiceConfig() {
    passport.use(
        new LocalStrategy(		// definimos para o express qual a estratégia de autenticação - loca com banco de dados
            {
                usernameField: "email",
                passwordField: "password",
            },
            async (email, password, done) => {
                try {
                    // busca o usuário no banco de dados
                    const user = await database.oneOrNone(
                    	"SELECT email, password FROM users WHERE email = $1;",
                    	[email],
                    );
    
                    // const user: IUser = { email: "nome", password: "pass", cpf: "00000000000" };
    
                    // se não encontrou, retorna erro
                    if (!user) {
                        return done(null, false, { message: "Usuário incorreto." });
                    }
    
                    // verifica se o hash da senha bate com a senha informada
                    const passwordMatch = await bcrypt.compare(
                    	password,
                    	user.password,
                    );
    
                    // const passwordMatch = user.email == email && user.password == password
    
                    // se senha está ok, retorna o objeto usuário
                    if (passwordMatch) {
                        console.log("Usuário autenticado!");
                        return done(null, user);
                    } else {
                        // senão, retorna um erro
                        console.log("Deu certo - não autorizado")
                        return done(null, false, { message: "Senha incorreta." });
                    }
                } catch (error) {
                    return done(error);
                }
            },
        ),
    );
    
    
    passport.use(
        new JwtStrategy(
            {
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                secretOrKey: "your-secret-key",
            },
            async (payload, done) => {
                try {
                    console.log(payload)
                    const user = await database.oneOrNone(
                    	"SELECT * FROM users WHERE email = $1;",
                    	[payload.username],
                    );
                    const pl = {name: user.name, email: user.email, role: user.role}
                    // console.log("Vendo payload", pl)
    
                    if (user) {
                        done(null, pl);
                    } else {
                        done(null, false);
                        console.log("[authService.ts] Usuário não encontrado na autenticação")
                    }
                } catch (error) {
                    done(error, false);
                }
            },
        ),
    );
    
    
    // funções padrão do serialize de configuração 
    passport.serializeUser(function (user: IUser, cb) {
        process.nextTick(function () {
            return cb(null, {
                user_id: user.cpf, // nome igual ao da coluna do banco
                username: user.email, // mesmo nome da variável do primeiro json do local strategy (la em cima)
            });
        });
    });
    
    passport.deserializeUser(function (user: IUser, cb) {
        process.nextTick(function () {
            return cb(null, user);
        });
    });
    
}
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import bcrypt from "bcrypt";
import { IUser } from "../../Interfaces/IUser";
import { database } from "../PostgresDB";

export function authServiceConfig() {
    passport.use(
        new LocalStrategy(
            {
                usernameField: "email",
                passwordField: "password",
            },
            async (email, password, done) => {
                try {
                    // busca o usuário no banco de dados
                    const user = await database.oneOrNone(
                    	"SELECT name, email, password, role FROM users WHERE email = $1;",
                    	[email],
                    );
    
                    // se não encontrou, retorna erro
                    if (!user) {
                        return done(null, false, { message: "Usuário incorreto." });
                    }
    
                    // verifica se o hash da senha bate com a senha informada
                    const passwordMatch = await bcrypt.compare(
                    	password,
                    	user.password,
                    );
    
    
                    // se senha está ok, retorna o objeto usuário
                    if (passwordMatch) {
                        return done(null, {name: user.name, email: user.email, role: user.role});
                    } else {
                        // senão, retorna um erro
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
                    const user = await database.oneOrNone(
                    	"SELECT * FROM users WHERE email = $1;",
                    	[payload.email],
                    );
                    const pl = {name: user.name, email: user.email, role: user.role}
    
                    if (user) {
                        done(null, pl);
                    } else {
                        done(null, false);  
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
                user_id: user.cpf, 
                username: user.email, 
            });
        });
    });
    
    passport.deserializeUser(function (user: IUser, cb) {
        process.nextTick(function () {
            return cb(null, user);
        });
    });
    
}
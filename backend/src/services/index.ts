import * as MailService from './EmailService/nodeMailer'
import * as JwtService from "./JwtService/JwtService"
import {database} from  "./PostgresDB"

export {MailService, JwtService, database}
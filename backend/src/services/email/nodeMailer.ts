import nodemailer from 'nodemailer';
import winston from 'winston';
import dotenv from "dotenv";
import { transporter } from './transporter';
dotenv.config();

const logger = winston.createLogger({
    level: 'debug',
    format: winston.format.json(),
    transports: [new winston.transports.Console()]
});

export const sendMail = async (from: string, to: string, subject: string, html: string) => {
    try {
        await transporter.sendMail({
            from: from,
            to: to,
            subject: subject,
            html: html
        })
        
    }
    catch (err) {
        console.log(err)
        throw err
    }

}
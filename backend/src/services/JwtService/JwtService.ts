import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
// import { InternalError } from '../../exceptions/InternalError';
// import { IPayLoad } from './IPayLoad';

dotenv.config()

function generateToken(payload: Object) {
    try {

        return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE_TIME });

    } catch(err) {
        throw err
    }
}

function validateToken(token: string): boolean {
    try {
        const format_token = token && token.split(' ')[1]
        jwt.verify(format_token, process.env.JWT_SECRET);
        return true;
    } catch (error) {
        return false;
    }
}

function getTokenPayload(token: string) {
    try {
        const format_token = token && token.split(' ')[1]
        if (process.env.JWT_SECRET == undefined) throw new Error("Fail to load jwt secret.")

        const decodedToken = jwt.verify(format_token, process.env.JWT_SECRET);

        return decodedToken

    } catch (err) {
        throw err
    }
}

export { getTokenPayload, generateToken, validateToken }

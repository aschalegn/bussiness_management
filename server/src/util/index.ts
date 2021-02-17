import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken";
import { Business } from "../model/Bussiness";
const secretKey = "123!@#";

const tokenise = (id: any, type: string) => {
    const info = { id, type }
    const token = jwt.sign(info, secretKey);
    return token;
}

const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const cookie = req.cookies.appointU;
    if (cookie) {
        console.log(cookie);
    }
    next();
}

const parseToken = async (req: Request, res: Response, next: NextFunction) => {
    const cookie = req.cookies.appointU;
    if (cookie) {
        let info = jwt.decode(cookie);
        res.locals.info = info;
        next();
    }
}


export { tokenise, authenticate, parseToken }
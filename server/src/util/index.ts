import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken";
const secretKey = "123!@#";

const tokenise = (body: any, type: string) => {
    const token = jwt.sign({ body, type }, secretKey);
    return token;
}

const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const cookie = req.cookies.appointU;
    if (cookie) {
        console.log(cookie);
    }
    next();
}

const parseToken = (req: Request, res: Response, next: NextFunction) => {
    const cookie = req.cookies.appointU;
    if (cookie) {
        const info = jwt.decode(cookie);
        return res.status(200).send(info);
    }
    return res.status(204).end();
}


export { tokenise, authenticate, parseToken }
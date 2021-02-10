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

const parseToken = (req: Request, res: Response) => {
    const cookie = req.cookies.easyProject;
    if (cookie) {
        const info = jwt.decode(cookie)
        console.log(info);
        res.status(200).send(info);
    }
}


export { tokenise, authenticate }
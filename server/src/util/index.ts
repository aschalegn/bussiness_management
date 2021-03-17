import express, { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import http from "http";
export const app = express();
export const server = http.createServer(app);

const secretKey = "123!@#";

const tokenise = (id: any, type: string) => {
    const info = { id, type }
    const token = jwt.sign(info, secretKey);
    return token;
};

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
        let info = jwt.decode(cookie);
        res.locals.info = info;
        return next();
    }
    // return res.status(200).send("hiii");
    // else {
        return res.status(202).send("hh");
    // }
}

export { tokenise, authenticate, parseToken }
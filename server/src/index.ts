import express, { NextFunction, Request, Response } from 'express';
import { server, app } from "./util";
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import { parseToken } from "./util";
import { emailEmiter } from "./eventsNotification/Email"
import { db } from './util/config';
import { Business } from './model/Bussiness';
import { Client } from './model/Client';

import businesRoute from "./routes/bussiness";
import clientRoutes from './routes/clients';
import appointmentRoutes from './routes/appointment';
import { Socket } from 'socket.io';

const appointmentEmitter = require("./eventsNotification/Appointments");
const io = require("socket.io")(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true
    }
});

io.on("connection", (socket: Socket) => {
    appointmentEmitter(io, socket);
});

dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(cors({
    origin: ["http://localhost:3000", "tor2u.com", "www.tor2u.com"],
    credentials: true
}));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//* Routing
app.use("/api/business", businesRoute);
app.use('/api/client', clientRoutes);
app.use('/api/appointment', appointmentRoutes);

app.get("/mobile/:type/:id", (req: Request, res: Response) => {
    const { type, id } = req.params;
    if (type === "client") {
        Client.findById(id).select(" -password ")
            .populate({
                path: "businesses",
                populate: { path: "businesses" }
            })
            .then((c: any) => {
                res.status(200).send({ body: c, type })
            })
    };
});

app.get("/api/isuser", parseToken, (req: Request, res: Response, next: NextFunction) => {
    const { type, id } = res.locals.info;
    if (type === "business") {
        Business.findById(id).select("-appointments -password")
            .then((b: any) => {
                res.status(200).send({ body: b, type })
            })
    };
    if (type === "client") {
        Client.findById(id).select(" -password ")
            .populate({
                path: "businesses",
                populate: { path: "businesses" }
            })
            .then((c: any) => {
                res.status(200).send({ body: c, type })
            })
    }
    else {
        res.status(500).send()
    }
});

app.get("/api/logout", (req: Request, res: Response, next: NextFunction) => {
    res.clearCookie("appointU");
    return res.status(200).end();
});

app.get("/api/forgotPassword", (req, res) => {
    const { email } = req.query;
    emailEmiter.emit("forgotPassword", email);
    return res.status(200).send();
});

//* DB Connection
mongoose.connect(db, {
    useFindAndModify: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
})
    .then(con => {
        console.log("connected to db");
    }).catch(err => {
        console.log("error connecting to db" + err);
    });

const PORT = process.env.PORT || 1000;
server.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});
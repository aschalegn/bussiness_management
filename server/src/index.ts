import express, { NextFunction, Request, Response } from 'express';
import { server, app, io } from "./util";
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import businesRoute from "./routes/bussiness";
import clientRoutes from './routes/clients';
import appointmentRoutes from './routes/appointment';
import cookieParser from "cookie-parser";
import { parseToken } from "./util";
import { emailEmiter } from "./eventsNotification/Email"
import { clients } from './eventsNotification';
import { db } from './util/config';
import { Business } from './model/Bussiness';
import { Client } from './model/Client';

dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//* Routing
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get("/test", (req, res) => {
    res.send("jkhgcfxchbjk");
});

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));

// Server sent events
app.get("/api/sse/:businessId", (req: Request, res: Response) => {
    const { businessId } = req.params;
    const isChanneliExists = clients.find(cl => cl.business === businessId);
    // console.log(isChanneliExists);

    // ! if chanell exists
    if (isChanneliExists) {
        // const isClientExists = clients[isChanneliExists].clients.find(r => {
        // return r === res;
        // });
        // if (!isClientExists) {
        // clients[isChanneliExists].clients.push(res);
        // }
    }
    // ! if business chanel not exsits
    else {
        const newChannel = { business: businessId, clients: [res] };
        clients.push(newChannel);
    }
    res.set("Content-Type", "text/event-stream");
    res.set("Connection", "keep-alive");
    res.set("Cache-Controll", "no-cache");
    res.set("Access-Controll-Allow-Origin", "*");
    return res.status(200).end();
});

app.use("/api/business", businesRoute);
app.use('/api/client', clientRoutes);
app.use('/api/appointment', appointmentRoutes);
app.get("/api/isUser", parseToken, (req: Request, res: Response, next: NextFunction) => {
    const { type, id } = res.locals.info;
    if (type === "business") {
        Business.findById(id).select("-appointments -password")
            .then((b: any) => {
                res.status(200).send({ body: b, type })
            })
    }
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
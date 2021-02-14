import express, { NextFunction, Request, response, Response } from 'express';
const app = express();
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
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));

// Server sent events
app.get("/api/sse/:businessId", (req: Request, res: Response) => {
    const { businessId } = req.params;
    const isChanneliExists = clients.findIndex(cl => cl.business === businessId);
    // ! if chanell exists
    if (isChanneliExists >= 0) {
        clients[isChanneliExists].clients.push(res);
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
app.get("/api/isUser", (req: Request, res: Response, next: NextFunction) => {
    parseToken(req, res, next);
});

app.get("/api/logout", (req: Request, res: Response, next: NextFunction) => {
    res.clearCookie("appointU");
    // return res.redirect("http://127.0.0.1:3000");
    return res.status(200).end();
});

app.get("/api/forgotPassword", (req, res) => {
    const { email } = req.query;
    emailEmiter.emit("forgotPassword", email);
    return res.status(200).send();
});

// emailEmiter.emit("forgotPassword", "practice2me@gmail.com");


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
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});
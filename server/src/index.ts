import express, { NextFunction,Request,Response } from 'express';
const app = express();
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import businesRoute from "./routes/bussiness";
import clientRoutes from './routes/clients';
import appointmentRoutes from './routes/appointment';
import cookieParser from "cookie-parser";
import { parseToken } from "./util";

dotenv.config();

app.use(cors({ credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//* Routing
app.use("*", (req, res, next) => {
    res.set("Access-Control-Allow-Origin", "http://localhost:3000");
    next();
})
app.use("/api/business", businesRoute);
app.use('/api/client', clientRoutes);
app.use('/api/appointment', appointmentRoutes);
app.get("/api/isUser", (req: Request, res: Response, next: NextFunction) => {
    parseToken(req, res, next);
});

//* DB Connection
const dbUrl = "mongodb://localhost:27017/bussiness";
mongoose.connect(dbUrl, {
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




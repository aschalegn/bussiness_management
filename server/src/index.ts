import express from 'express';
import { server, app, io } from './Socket';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

require("./appointment/events/index")(io);
require("./setting/Times")(io);
require("./cronejob/index")(io);
dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//* DB Connection
const dbUrl = "mongodb://localhost:27017/bussiness";
mongoose.connect(dbUrl, {
    useFindAndModify: true,
    useUnifiedTopology: true,
    useNewUrlParser: true
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




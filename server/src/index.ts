import express from 'express';
const app = express();
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

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

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});




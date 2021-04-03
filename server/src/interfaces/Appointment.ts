import mongoose, { ObjectId } from "mongoose";
import { IService } from "./Servece";

interface IAppointment extends mongoose.Document {
    client: string,
    barber: string,
    date: string,
    time: string,
    style: string,
    bussiness: string,
}

export { IAppointment }
import mongoose, { ObjectId } from "mongoose";

interface IAppointment extends mongoose.Document {
    client: ObjectId,
    barber: string,
    date: string,
    time: string,
    style: string
}

export { IAppointment }
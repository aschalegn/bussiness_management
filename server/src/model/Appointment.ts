import mongoose, { Schema } from "mongoose";
import { IAppointment } from "../interfaces/Appointment";

const appointmentSchema: Schema = new Schema({
    client: {
        type: mongoose.Types.ObjectId,
        ref: 'Client'
    },
    barber: String,
    date: String,
    time: String,
    style: String,
    bussiness: {
        type: mongoose.Types.ObjectId,
        ref: 'Business'
    }
});

const Appointment = mongoose.model<IAppointment>('Appointment', appointmentSchema);
export { Appointment };
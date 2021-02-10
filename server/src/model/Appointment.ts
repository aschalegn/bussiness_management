import mongoose, { Schema } from "mongoose";

const appointmentSchema = new Schema({
});


const Appointment = mongoose.model('Appointment', appointmentSchema);
export { Appointment };
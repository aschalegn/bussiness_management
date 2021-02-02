import mongoose, { Schema } from 'mongoose';

const AppointmentSchema: Schema = new Schema({
    client: {
        type: mongoose.Types.ObjectId,
        ref: "Client"
    },
    date: { type: String },
    hour: { type: String }
});

export const Appointment = mongoose.model("Appointment", AppointmentSchema);

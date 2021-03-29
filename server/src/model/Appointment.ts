import mongoose, { Schema } from "mongoose";
import { IAppointment } from "../interfaces/Appointment";
import { IService } from "../interfaces/Servece";

const appointmentSchema: Schema = new Schema({
    barber: String,
    date: Date,
    time: String,
    style: {
        type: Schema.Types.ObjectId,
        ref: 'Business.services'
    },
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client'
    },
    bussiness: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Business'
    }
});

const Appointment = mongoose.model<IAppointment>('Appointment', appointmentSchema);
export { Appointment };

// const styleSchema: Schema = new Schema({
//     name: { type: String, required: true },
//     price: { type: Number, required: true },
//     img: { type: String, required: false },
// });


// const Service = mongoose.model<IService>('Service', styleSchema);
// export { Service };
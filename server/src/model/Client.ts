import mongoose, { Schema } from "mongoose";
import { IClient} from "../interfaces/Clients";

const clientSchema = new Schema({
   fullName: String,
   phone: { type: Number, unique: true },
   birthDate: String,
   appointments: [{
    type: mongoose.Types.ObjectId,
    ref: "Appointment"
}],
   joinDate: {type: Date, default: Date.now},
   businesses: [{
    type: mongoose.Types.ObjectId,
    ref: "Business"
}]


});


const Client = mongoose.model<IClient>('Client', clientSchema);
export { Client };
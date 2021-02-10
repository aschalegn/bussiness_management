import mongoose, { Schema } from "mongoose";

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


const Client = mongoose.model('Client', clientSchema);
export { Client };
import mongoose, { Schema } from "mongoose";

const clientSchema = new Schema({
   fullName: String,
   phone: {type: Number, unique: true},
   birthDate: String,
   joinDate: {type: Date, default: Date.now},
   businessID: [{
    type: mongoose.Types.ObjectId,
    ref: "Business"
}],
   appointments: [{
    type: mongoose.Types.ObjectId,
    ref: "Appointment"
}]
});


const Client = mongoose.model('Client', clientSchema);
export { Client };
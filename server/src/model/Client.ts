import mongoose, { Schema } from 'mongoose';

const ClientSchema = new Schema({
    fullname: { type: String },
    phone: { type: Number },
    IMEI: { type: String }
});

export const Client = mongoose.model("Client", ClientSchema);

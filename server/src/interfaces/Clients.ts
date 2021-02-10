import mongoose, { ObjectId } from "mongoose";

export interface IClient extends mongoose.Document {
    fullName: String,
    phone: { type: Number, unique: true },
    birthDate: String,
    appointments: [ObjectId],
    joinDate: String,
    businesses: [ObjectId]
}
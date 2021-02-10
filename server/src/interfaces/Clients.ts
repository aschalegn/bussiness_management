import mongoose, { ObjectId } from "mongoose";

export interface IClient extends mongoose.Document {
    fullName: String,
    phone: { type: String, unique: true },
    birthDate: String,
    appointments: [ObjectId],
    joinDate: String,
    businesses: [ObjectId]
}
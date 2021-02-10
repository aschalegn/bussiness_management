import mongoose, { ObjectId } from "mongoose";

export interface IClient extends mongoose.Document {
    fullName: string,
    phone: { type: string, unique: true },
    birthDate: string,
    appointments: [ObjectId],
    joinDate: string,
    businesses: [ObjectId]
}
import mongoose from "mongoose";

export interface ICronJob extends mongoose.Document {
    name: string
    description: string
    cron: {
        month: string,
        day: string,
        hour: string,
        minute: string,
        year: string
    }
}
import mongoose, { Schema } from "mongoose";
import { ICronJob } from "../interfaces/CroneJob";

const appointmentSchema: Schema = new Schema({
    name: String,
    description: String,
    cron: {
        month: String,
        day: String,
        hour: String,
        minute: String,
        year: String
    }
});

const CronJob = mongoose.model<ICronJob>('CronJob', appointmentSchema);
export { CronJob };
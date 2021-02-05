import mongoose, { Schema } from 'mongoose';

const SettingSchema = new Schema({
    bussinessName: String,
    workers: [{
        workerName: String,
        startTime: String,
        endTime: String,
        timesBetween: [String]
    }],
    times: { openAt: String, closeAt: String },
    services: [String]
})

export const Setting = mongoose.model("Setting", SettingSchema);

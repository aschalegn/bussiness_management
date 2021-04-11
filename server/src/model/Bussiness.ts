import mongoose, { Schema } from "mongoose";
import { IBusiness } from "../interfaces/Business";

const businessSchema = new Schema({
    name: { type: String, required: true },
    email: String,
    password: { type: String, required: true },
    services: [
        {
            name: String,
            price: Number,
            img: String
        }
    ],
    category: String,
    logo: String,
    poster: String,
    joinDate: String,
    times: { openAt: String, closeAt: String },
    phones: [],
    about: String,
    socialMedia: {type:
        [{
            name: String, link: String,
        }], default: [
            { name: 'instagram', link: '' },
            { name: 'facebook', link: '' },
            { name: 'whatsApp', link: '' }]
    },
    workers: [{
        times: { openAt: String, closeAt: String, jump: Number },
        availableTimes: [String],
        role: { type: String, enum: ["worker", "manager"] },
        permitions: [],
        skills: [String],
        password: String,
        phone: String,
        email: String
    }],
    appointments: [{
        type: mongoose.Types.ObjectId,
        ref: "Appointment"
    }],
    clients: [{
        type: mongoose.Types.ObjectId,
        ref: "Client"
    }],
    waitingList: [{
        client: {
            type: mongoose.Types.ObjectId,
            ref: "Client"
        },
        workerId: { type: String },
        date: String,
        time: String
    }]
});

const Business = mongoose.model<IBusiness>('Business', businessSchema);
export { Business };
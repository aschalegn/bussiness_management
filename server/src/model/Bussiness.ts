import mongoose, { Schema } from "mongoose";

const businessSchema = new Schema({
    name: { type: String, required: true },
    email: String,
    password: { type: String, required: true },
    services: {
        main: [],
        details: [{ name: String, price: Number }]
    },
    logo: String,
    poster: String,
    joinDate: String,
    times: [{ apenAt: String, closeAt: String }],
    phones: [],
    about: String,
    socialMedia: [{ name: String, link: String }],
    workers: [{
        id: String, name: String, phone: String,
        times: [{ openAt: String, closeAt: String, jump: Number }],
        availableTimes: [String],
        role: { type: String, enum: ["עובד", "מנהל"] },
        skills: [String]
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


const Business = mongoose.model('Business', businessSchema);
export { Business };
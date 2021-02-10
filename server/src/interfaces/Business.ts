import mongoose, { ObjectId } from "mongoose";

export interface IBusiness extends mongoose.Document {
    name: string,
    email: string,
    password: string,
    services: {
        main: [],
        details: [{ name: string, price: Number }]
    },
    logo: string,
    poster: string,
    joinDate: string,
    times: [{ apenAt: string, closeAt: string }],
    phones: [],
    about: string,
    socialMedia: [{ name: string, link: string }],
    workers: [{
        id: string,
        name: string,
        phone: string,
        times: [{ openAt: string, closeAt: string, jump: number }],
        availableTimes: [string],
        role: string,
        skills: [string]
    }],
    appointments: [ObjectId],
    clients: [ObjectId],
    waitingList: [{
        client: ObjectId,
        workerId: string,
        date: string,
        time: string
    }]
}
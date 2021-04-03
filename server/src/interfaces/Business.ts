import mongoose, { ObjectId } from "mongoose";

export interface IBusiness extends mongoose.Document {
    name: string,
    email: string,
    password: string,
    catrgory: string,
    services: [{ name: string, price: number, img: string }],
    logo: string,
    poster: string,
    joinDate: string,
    times: { openAt: string, closeAt: string },
    phones: [],
    about: string,
    socialMedia: [{ name: string, link: string }],
    workers: [{
        id: string,
        name: string,
        phone: string,
        times: { openAt: string, closeAt: string, jump: number },
        availableTimes: [string],
        role: string,
        skills: [string],
        password: string
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
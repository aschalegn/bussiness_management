import { EventEmitter } from "events";
import { ObjectId } from "mongoose";
import { Socket } from "socket.io";
import { clients } from ".";
import { IAppointment } from "../interfaces/Appointment";
import { io } from "../util";
export const appointmentEmitter = new EventEmitter();

// * when appointment is made send event to clients connected
appointmentEmitter.on("made", (businessId: string, data: IAppointment) => {
    //Todo: invoke a function to notify all sse clients of the business 
    io.on("connection", (socket: Socket) => {
        socket.emit("turnMade", "new turn");
    });
    // for (let i = 0; i < clients.length; i++) {
    //     const client = clients[i];
    //     console.log(clients);
    //     if (client.business === businessId) {
    //         client.clients.forEach(res => {
    //             console.log({ data });
    //             res.set("Content-Type", "text/event-stream");
    //             res.set("Connection", "keep-alive");
    //             res.set("Cache-Controll", "no-cache");
    //             res.set("Access-Controll-Allow-Origin", "*");
    //             return res.status(200).write(`event: appointmentAdded\ndata:${data}\n\n`);
    //         });
    //     }
    // }
    // createCronJob(data, businessId);
});

// * when appointment is getting deleted send event to clients connected
appointmentEmitter.on("deleted", (businessId: string, data: ObjectId) => {
    //Todo: invoke a function to notify all sse clients of the business 
    for (let i = 0; i < clients.length; i++) {
        const client = clients[i];
        if (client.business === businessId) {
            client.clients.forEach(res => {
                res.set("Content-Type", "text/event-stream");
                res.set("Connection", "keep-alive");
                res.set("Cache-Controll", "no-cache");
                res.set("Access-Controll-Allow-Origin", "*");
                return res.status(200).write(`event: appointmentDeleted\ndata:${data}\n\n`);
            });
        }
    }
});

// * when appointment is getting updated send event to clients connected
appointmentEmitter.on("updated", (businessId: string, data: IAppointment) => {
    //Todo: invoke a function to notify all sse clients of the business 
    for (let i = 0; i < clients.length; i++) {
        const client = clients[i];
        if (client.business === businessId) {
            client.clients.forEach(res => {
                res.set("Content-Type", "text/event-stream");
                res.set("Connection", "keep-alive");
                res.set("Cache-Controll", "no-cache");
                res.set("Access-Controll-Allow-Origin", "*");
                return res.status(200).write(`event: appointmentUpdated\ndata:${data}\n\n`);
            });
        }
    }
});
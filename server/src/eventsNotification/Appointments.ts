import { EventEmitter } from "events";
import { ObjectId } from "mongoose";
import { Socket } from "socket.io";
import { IAppointment } from "../interfaces/Appointment";
import { io } from "../util";
export const appointmentEmitter = new EventEmitter();

// * when appointment is made send event to clients connected
appointmentEmitter.on("made", (businessId: string, data: IAppointment) => {
    //Todo: invoke a function to notify all sse clients of the business 
    io.on("connection", (socket: any) => {
        socket.emit("turnMade", "new turn");
    });
    
});

// * when appointment is getting deleted send event to clients connected
appointmentEmitter.on("deleted", (businessId: string, data: string) => {
  
});

// * when appointment is getting updated send event to clients connected
appointmentEmitter.on("updated", (businessId: string, data: IAppointment) => {
    
});
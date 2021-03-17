import { EventEmitter } from "events";
import { Socket } from "socket.io";
import { IAppointment } from "../interfaces/Appointment";
export const appointmentEmitter = new EventEmitter();

module.exports = (io:any,socket:Socket) => {
    // * when appointment is made send event to clients connected
    appointmentEmitter.on("made", (businessId: string, data: IAppointment) => {
        io.broadcast("appontmentAdded", "");
    });

    // * when appointment is getting deleted send event to clients connected
    appointmentEmitter.on("deleted", (businessId: string, data: string) => {

    });

    // * when appointment is getting updated send event to clients connected
    appointmentEmitter.on("updated", (businessId: string, data: IAppointment) => {

    });
}

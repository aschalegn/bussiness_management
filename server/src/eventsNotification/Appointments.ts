import { EventEmitter } from "events";
import { Socket } from "socket.io";
import { IAppointment } from "../interfaces/Appointment";

const appointmentEmitter = new EventEmitter();
appointmentEmitter.setMaxListeners(1000);

const EmitterIO = (io: any, socket: Socket) => {
    appointmentEmitter.on("made", (businessId: string, data: IAppointment) => {
        socket.emit("appontmentAdded", { businessId, data });
    });

    appointmentEmitter.on("deleted", (businessId: string, data: string) => {
        socket.emit("appontmentDeleted", businessId, data);
    });

    appointmentEmitter.on("updated", (businessId: string, data: IAppointment) => {
        
    });
};

export { appointmentEmitter, EmitterIO };
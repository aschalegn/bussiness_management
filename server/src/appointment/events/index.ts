import { IAppointment } from "../../interfaces/Appointment";
import { addAppointment } from "../controller";

module.exports = (io: any) => {
    io.on("connection", (socket: any) => {
        console.log("connected to socket");
        socket.on("hello", (msg: any) => {
            console.log(msg);
        });
        socket.on("makeTurn", (data: IAppointment) => {
            // ! add to database
            const turn = addAppointment(data);
            console.log(turn);

            // if (turn){}
            // ! schedual crone job

            // ! update the admin app

            // ! update the availeable hours

            // ! send sms - if the app owner has the service
        });
    });
}
import { IAppointment } from "../../interfaces/Appointment";
import { Appointment } from "../../model/Appointment";

module.exports = (io: any) => {
    io.on("connection", (socket: any) => {
        console.log("connected to socket");

        socket.on("makeTurn", (data: IAppointment) => {
            // ! add to database
            console.log(data);
            const newTurn = new Appointment(data);
            newTurn.save()
                .then(turn => {
                    socket.emit("turn made", turn);
                }).catch(err => {
                    socket.emit("turn problem");
                    console.log(err);
                });

            //* schedual crone job -done

            //TODO: update the availeable hours  -lilach

            //? send sms - if the app owner has the service

        });
    });
}
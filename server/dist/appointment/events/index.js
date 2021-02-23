"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Appointment_1 = require("../../model/Appointment");
module.exports = function (io) {
    io.on("connection", function (socket) {
        console.log("connected to socket");
        socket.on("makeTurn", function (data) {
            // ! add to database
            console.log(data);
            var newTurn = new Appointment_1.Appointment(data);
            newTurn.save()
                .then(function (turn) {
                socket.emit("turn made", turn);
            }).catch(function (err) {
                socket.emit("turn problem");
                console.log(err);
            });
            // ! schedual crone job
            // ! update the admin app
            // ! update the availeable hours
            // ! send sms - if the app owner has the service
        });
    });
};

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appointmentEmitter = void 0;
var events_1 = require("events");
var util_1 = require("../util");
exports.appointmentEmitter = new events_1.EventEmitter();
// * when appointment is made send event to clients connected
exports.appointmentEmitter.on("made", function (businessId, data) {
    //Todo: invoke a function to notify all sse clients of the business 
    util_1.io.on("connection", function (socket) {
        socket.emit("turnMade", "new turn");
    });
});
// * when appointment is getting deleted send event to clients connected
exports.appointmentEmitter.on("deleted", function (businessId, data) {
});
// * when appointment is getting updated send event to clients connected
exports.appointmentEmitter.on("updated", function (businessId, data) {
});

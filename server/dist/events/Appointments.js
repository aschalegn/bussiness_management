"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var events_1 = require("events");
var appointmentEmitter = new events_1.EventEmitter();
appointmentEmitter.on("made", function (bussiness, data) {
    //Todo: invoke a function to notify all sse clients of the bussiness 
});

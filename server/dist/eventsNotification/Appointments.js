"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appointmentEmitter = void 0;
var events_1 = require("events");
var _1 = require(".");
var util_1 = require("../util");
exports.appointmentEmitter = new events_1.EventEmitter();
// * when appointment is made send event to clients connected
exports.appointmentEmitter.on("made", function (businessId, data) {
    //Todo: invoke a function to notify all sse clients of the business 
    util_1.io.on("connection", function (socket) {
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
exports.appointmentEmitter.on("deleted", function (businessId, data) {
    //Todo: invoke a function to notify all sse clients of the business 
    for (var i = 0; i < _1.clients.length; i++) {
        var client = _1.clients[i];
        if (client.business === businessId) {
            client.clients.forEach(function (res) {
                res.set("Content-Type", "text/event-stream");
                res.set("Connection", "keep-alive");
                res.set("Cache-Controll", "no-cache");
                res.set("Access-Controll-Allow-Origin", "*");
                return res.status(200).write("event: appointmentDeleted\ndata:" + data + "\n\n");
            });
        }
    }
});
// * when appointment is getting updated send event to clients connected
exports.appointmentEmitter.on("updated", function (businessId, data) {
    //Todo: invoke a function to notify all sse clients of the business 
    for (var i = 0; i < _1.clients.length; i++) {
        var client = _1.clients[i];
        if (client.business === businessId) {
            client.clients.forEach(function (res) {
                res.set("Content-Type", "text/event-stream");
                res.set("Connection", "keep-alive");
                res.set("Cache-Controll", "no-cache");
                res.set("Access-Controll-Allow-Origin", "*");
                return res.status(200).write("event: appointmentUpdated\ndata:" + data + "\n\n");
            });
        }
    }
});

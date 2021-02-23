"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var moment_1 = __importDefault(require("moment"));
// module.exports = (io: any) => {
//     io.on("connection", (socket: any) => {
//         console.log("connected to times");
//         socket.on("setOpenningHours", (data: any) => {
//             data.workers.map((worker: any) => {
//                 worker.timeBetween = addSetAvailable(worker)
//                 // console.log(worker.timeBetween);
//             });
//             // console.log(data);
//             const setTime = new Setting(data);
//             setTime.save()
//                 .then(time => {
//                     socket.emit("time setup", time);
//                     console.log(time);
//                 }).catch(err => {
//                     socket.emit("time error")
//                     console.log(err);
//                 })
//         })
//     })
// }
var addSetAvailable = function (data) {
    console.log(data);
    var jump = data.jump;
    var startTime = moment_1.default(data.open, "kk:mm").format("kk:mm");
    var endTime = moment_1.default(data.close, "kk:mm").format("kk:mm");
    var start = moment_1.default(data.open, "kk:mm");
    var end = moment_1.default(data.close, "kk:mm");
    var timesBetween = [];
    while (start < end) {
        timesBetween.push(start.clone().format("kk:mm")); // clone to add new object
        start.add(jump, "m");
    }
    // console.log(data,'datttta-----------');
    return timesBetween;
};

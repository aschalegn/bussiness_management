import moment from 'moment';
import { Setting } from '../model/Setting';

module.exports = (io: any) => {
    io.on("connection", (socket: any) => {
        console.log("connected to times");
        socket.on("setOpenningHours", (data: any) => {
            data.workers.map((worker: any) => {

                worker.timeBetween = addSetAvailable(worker)
                // console.log(worker.timeBetween);

            })
            // console.log(data);
            const setTime = new Setting(data);
            setTime.save()
                .then(time => {
                    socket.emit("time setup", time);
                    console.log(time);
                }).catch(err => {
                    socket.emit("time error")
                    console.log(err);
                })
        })
    })
}

const addSetAvailable = (data: any) => {
console.log(data);

    const jump = data.jump
    const startTime = moment(data.open, "kk:mm").format("kk:mm")
    const endTime = moment(data.close, "kk:mm").format("kk:mm")
    const start = moment(data.open, "kk:mm")
    const end = moment(data.close, "kk:mm")
    const timesBetween = [];

    while (start < end) {
        timesBetween.push(start.clone().format("kk:mm"))// clone to add new object
        start.add(jump, "m");
    }
<<<<<<< HEAD

    console.log(timesBetween);
=======
// console.log(data,'datttta-----------');


    return timesBetween
>>>>>>> 17841a281ac10a206252badb183f40700649d5ee
}

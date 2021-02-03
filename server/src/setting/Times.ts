import moment from 'moment';

module.exports = (io: any) => {
    io.on("connection", (socket: any) => {
        console.log("connected to times");
        socket.on("setOpenningHours", (data: any) => addSetAvailable(data))
    })
}

const addSetAvailable = (data: any) => {
    const jump = data.jump
    const start = moment(data.open,"kk:mm")
    const end = moment(data.close,"kk:mm")
    const timesBetween = [];

    while (start < end) {
        timesBetween.push(start.clone().format("kk:mm"))// clone to add new object
        start.add(jump, "m");
    }
    console.log(timesBetween);
}

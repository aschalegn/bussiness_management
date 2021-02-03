import crone from 'node-cron';

const setSchedual = (month: number, day: number, hour: number, minute: number) => {
    crone.schedule(`0 ${minute} ${hour} ${day} ${month} 0`, () => {
        // ! send in app notification or sms
    });
}

module.exports = (io: any) => {
    io.on("connection", (socket: any) => {
        socket.on("turn made", (data: any) => {
            const { month, day, hour, minute } = data;
            setSchedual(month, day, hour, minute);
        });
    });
}
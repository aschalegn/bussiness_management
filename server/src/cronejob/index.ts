import crone from 'node-cron';

export const setSchedualForSms = (date: any) => {
    const { month, day, hour, minute, year } = date;
    crone.schedule(`0 ${minute} ${hour} ${day} ${month} ${year}`, () => {
        // ! send in app notification or sms
        
    });
}

// module.exports = (io: any) => {
//     io.on("connection", (socket: any) => {
//         socket.on("turn made", (data: any) => {
//             // const { month, day, hour, minute } = data;
//             setSchedual(data);
//         });
//     });
// }
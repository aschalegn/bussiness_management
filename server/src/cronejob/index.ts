import crone from 'node-cron';
import { ICronJob } from '../interfaces/CroneJob';

export const setSchedualForSms = (croneJob: ICronJob) => {
    const { month, day, hour, minute, year } = croneJob.cron;
    crone.schedule(`0 ${minute} ${hour} ${day} ${month} ${year}`, () => {
        // ! send in app notification or sms

    });
}

export const createCronJob = (data: any) => {
    let { month, day, hour, minute, year } = data;
    month= String(month), day, hour, minute, year , String(day), String(hour), String(minute), String(year)
    const job: ICronJob = {
        name: "send sms",
        description: "",
        cron: { month, day, hour, minute, year }
    }
    setSchedualForSms(job);
}

// module.exports = (io: any) => {
//     io.on("connection", (socket: any) => {
//         socket.on("turn made", (data: any) => {
//             // const { month, day, hour, minute } = data;
//             setSchedual(data);
//         });
//     });
// }
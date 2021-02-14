import crone from 'node-cron';
// import { ICronJob } from '../interfaces/CroneJob';
import { CronJob } from '../model/CronJob';

export const setSchedualForSms = (croneJob: any) => {
    const { month, day, hour, minute, year } = croneJob.cron;
    crone.schedule(`0 ${minute} ${hour} ${day} ${month} ${year}`, () => {
        // ! send in app notification or sms
        CronJob.create(croneJob);
    });
}

export const createCronJob = (data: any) => {
    let { month, day, hour, minute, year } = data;
    //  stringify(month), stringify(day), stringify(hour), stringify(minute), stringify(year),
    month = month.toString();
    day = day.toString();
    hour = hour.toString();
    minute = minute.toString();
    year = year.toString();
    const job = {
        name: "send sms",
        description: "send sms on appointment creation",
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
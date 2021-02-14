import crone from 'node-cron';
// import { ICronJob } from '../interfaces/CroneJob';
import { CronJob } from '../model/CronJob';
export const setSchedualForSms = (croneJob: any, bussinessId: string) => {
    const { month, day, hour, minute, year } = croneJob.cron;
    crone.schedule(`0 ${minute} ${hour} ${day} ${month} ${year}`, () => {
        // ! send in app notification or sms
        CronJob.create(...croneJob, bussinessId);
    });
}

export const createCronJob = (data: any, businessId: string) => {
    let { month, day, hour, minute, year } = data;
    const job = {
        name: "send sms",
        description: "send sms on appointment creation",
        cron: { month, day, hour, minute, year }
    }
    setSchedualForSms(job, businessId);
}
import React, { useContext } from 'react';
import moment from 'moment';
import { appointmentContext } from '../../../../context/Appointments';
import AdminNav from '../../../Layouts/AppBar/AdminNav'
import { userContext } from '../../../../context/User';

export default function Live() {
    const { appointments } = useContext(appointmentContext);
    const { user } = useContext(userContext);

    const live: Array<any> = [];
    const getThreeAp = () => {
        let now = moment().format("HH:mm");
        for (let i = 0; i < user.workers.length; i++) {
            const worker = user.workers[i];
            const firstAvailable = moment(worker.availableTimes[0], "HH:mm").format("HH:mm");
            if (now > firstAvailable) {
                const workerName = worker.name;
                live.push({worker: workerName, times: []});
                for (let j = 0; j < 3; j++) {
                    const workerAvailableTimes = worker.availableTimes[j];
                    live[i].times.push(workerAvailableTimes);
                }                
            }
            else {
                for (let i = 0; i < appointments.length; i++) {
                    const ap = appointments[i];
                    if (ap) {

                    }
                }
            }
        }
    };

    getThreeAp()
    return (
        <>
            <AdminNav location="תורים עכשיו" />
            <section className="Live">
                {live.map((ti, i) => {
                    return <>
                        <h4 key={i}>{ti.worker}</h4>
                        {ti.times.map((time:any,j:number)=>{
                          return   <div key={j}>{time}</div>
                        })}
                    </>
                })}
            </section>
        </>
    )
}

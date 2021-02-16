import React, { useContext } from 'react';
import moment from 'moment';
import { appointmentContext } from '../../../../context/Appointments';
import AdminNav from '../../../Layouts/AppBar/AdminNav'
import { userContext } from '../../../../context/User';

export default function Live() {
    const { appointments } = useContext(appointmentContext);
    const { user } = useContext(userContext);

    const live: {}[] = [];
    const getThreeAp = () => {
        let now = moment().format("HH:mm");
        const firstAvailable = moment(user.workers[1].availableTimes[0], "HH:mm").format("HH:mm");

        if (now < firstAvailable) {
            live.push(user.workers[1].availableTimes[0]);
            live.push(user.workers[1].availableTimes[1]);
            live.push(user.workers[1].availableTimes[2]);
        }
        else {
            for (let i = 0; i < appointments.length; i++) {
                const ap = appointments[i];
                if (ap) {

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
                    return <div key={i} >{ti}</div>
                })}
            </section>
        </>
    )
}

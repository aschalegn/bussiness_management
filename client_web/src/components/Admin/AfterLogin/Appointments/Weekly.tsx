import React, { useContext, useEffect, useState } from 'react';
import moment from "moment";
import { userContext } from '../../../../context/User';
import { type } from 'os';

interface IAppointment {
    client: { fullName: string },
    barber: string,
    date: string,
    time: string,
    style: string,
    bussiness: string,
};

type Props = {
    appointments: IAppointment[]
};

export default function Weekly({ appointments }: Props) {
    const { user } = useContext(userContext);
    const d: number[] = [];
    const [days, setDays] = useState(d);
    interface Ida {
        date: number, aps: IAppointment[]
    }
    const daysAp: Ida[] = [];
    useEffect(() => {
        getCurrentWeekDays();
    }, []);

    const getCurrentWeekDays = () => {
        const from_date = moment().startOf('week');
        const localDays = [];
        for (let i = 0; i < 6; i++) {
            localDays.push(from_date.toDate().getDate() + i);
        }
        setDays(localDays);
    };

    return (
        <section className="weekly">
            <article className="days">
                <div>שעה / תאריך</div>
                {days.map((day, i) =>
                    <div key={i}>{day}</div>
                )}
            </article>
            <article className="board">

                {user.workers[1].availableTimes.map((time, i) =>
                    <div key={time} className="hour">
                        <div className="time">{time}</div>
                        <div className="appointment">
                            {appointments.map(ap => {
                                const date = Number(new Date(ap.date).getDate());
                                if (date === days[0] && time === ap.time) {
                                    return <p className="red">{ap.client.fullName}</p>
                                }
                            })}
                        </div>
                        <div className="appointment">
                            {appointments.map(ap => {
                                const date = Number(new Date(ap.date).getDate());
                                if (date === days[1] && time === ap.time) {
                                    return <p className="red">{ap.client.fullName}</p>
                                }
                            })}
                        </div>
                        <div className="appointment">
                            {appointments.map(ap => {
                                const date = Number(new Date(ap.date).getDate());
                                if (date === days[2] && time === ap.time) {
                                    return <p className="red">{ap.client.fullName}</p>
                                }
                            })}
                        </div>
                        <div className="appointment">
                            {appointments.map(ap => {
                                const date = Number(new Date(ap.date).getDate());
                                if (date === days[3] && time === ap.time) {
                                    return <p className="red">{ap.client.fullName}</p>
                                }
                            })}
                        </div>
                        <div className="appointment">
                            {appointments.map(ap => {
                                const date = Number(new Date(ap.date).getDate());
                                if (date === days[4] && time === ap.time) {
                                    return <p className="red">{ap.client.fullName}</p>
                                }
                            })}
                        </div>
                        <div className="appointment">
                            {appointments.map(ap => {
                                const date = Number(new Date(ap.date).getDate());
                                if (date === days[6] && time === ap.time) {
                                    return <p className="red">{ap.client.fullName}</p>
                                }
                            })}
                        </div>
                    </div>
                )}
            </article>
        </section>
    )
}

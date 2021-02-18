import React, { ChangeEvent, useContext, useEffect, useState } from 'react'
import moment from "moment";
import { userContext } from '../../../context/User';
import { appointmentContext } from '../../../context/Appointments';
import {IAppointment} from '../../../interfaces';


export default function Appointment() {

    const d: number[] = [];
    const [days, setDays] = useState(d);

    const { appointments, getAppointments } = useContext(appointmentContext);
    useEffect(() => {
        getAppointments("6028e4f2ed8a283230f4bc6c");
        getCurrentWeekDays();
        return () => {

        }
    }, []);
    const { user } = useContext(userContext);
    interface Ida {
        date: number, aps: IAppointment[]
    }



    const [worker, setWorker] = useState(user.businesses[0].workers[0]);
    const getCurrentWeekDays = () => {
        const from_date = moment().startOf('week');
        const localDays = [];
        for (let i = 0; i < 6; i++) {
            localDays.push(from_date.toDate().getDate() + i);
        }
        setDays(localDays);
    };

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const filterWorkerById = user.businesses[0].workers.filter((w: any, i: any) => {
            return w._id === e.target.value
        });
        setWorker(filterWorkerById[0])
    };
    return (
        <section className="weekly">
            <select name="" id="" onChange={handleChange}>
                {user.businesses[0].workers.map(worker =>
                    <option key={worker._id} value={worker._id}>{worker.name}</option>
                )}
            </select>
            <article className="days">
                <div>שעה / תאריך</div>
                {days.map((day, i) =>
                    <div key={i}>{day}</div>
                )}
            </article>
            <article className="board">
            
                {worker.availableTimes.map((time: any, i) =>
                    <div key={time} className="hour"  >
                        <div className="time">{time}</div>
                        <div className="appointment">
                            {appointments.map(ap => {
                                const date = Number(new Date(ap.date).getDate());
                                if (date === days[0] && time === ap.time && ap.barber === worker.name) {
                                    return <p className="red">{ap.client.fullName}</p>
                                } else {
                                    return <p onClick={() => alert(`clicked ${ap.date} ${time}`)}></p>
                                }
                            })}
                        </div>
                        <div className="appointment">
                            {appointments.map(ap => {
                                const date = Number(new Date(ap.date).getDate());
                                if (date === days[1] && time === ap.time && ap.barber === worker.name) {
                                    return <p className="red">{ap.client.fullName}</p>
                                }
                                return <p onClick={() => alert(`clicked ${ap.date} ${time}`)}></p>
                            })}
                        </div>
                        <div className="appointment">
                            {appointments.map(ap => {
                                const date = Number(new Date(ap.date).getDate());
                                if (date === days[2] && time === ap.time && ap.barber === worker.name) {
                                    return <p className="red">{ap.client.fullName}</p>
                                }
                                return <p onClick={() => alert(`clicked ${ap.date} ${time}`)}></p>
                            })}
                        </div>
                        <div className="appointment">
                            {appointments.map(ap => {
                                const date = Number(new Date(ap.date).getDate());
                                if (date === days[3] && time === ap.time && ap.barber === worker.name) {
                                    return <p className="red">{ap.client.fullName}</p>

                                }
                                return <p onClick={() => alert(`clicked ${ap.date} ${time}`)}></p>
                            })}

                        </div>
                        <div className="appointment">
                            {appointments.map(ap => {
                                const date = Number(new Date(ap.date).getDate());
                                if (date === days[4] && time === ap.time && ap.barber === worker.name) {
                                    return <p className="red">{ap.client.fullName}</p>
                                }
                                return <p onClick={() => alert(`clicked ${ap.date} ${time}`)}></p>
                            })}
                        </div>
                        <div className="appointment">
                            {appointments.map(ap => {
                                const date = Number(new Date(ap.date).getDate());
                                if (date === days[5] && time === ap.time && ap.barber === worker.name) {
                                    return <div><p className="red">{ap.client.fullName}</p></div>
                                } else {
                                    // return <div onClick={() => alert(`clicked ${ap.date} ${time}`)}><p  className="free"></p></div> 
                                }
                            })}
                        </div>
                    </div>
                )}
            </article>
            

            {/* <article>
                <table>
                    <tbody>
                        <tr>
                            
                            <td>
                                
                                <div>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <div>gdhdfd</div>
                                                </td>
                                            </tr>
                                            <tr>hdth</tr>
                                        </tbody>
                                    </table>
                                </div>
                            </td>
                            <td>
                                ukg
                                <div>
                                    jffuyu
                                    <div>
hdhd
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            
                            <td>sgs</td>
                            <td>sgsgs</td>
                        </tr>
                    </tbody>
                </table>
            </article> */}
        </section >

    )
}

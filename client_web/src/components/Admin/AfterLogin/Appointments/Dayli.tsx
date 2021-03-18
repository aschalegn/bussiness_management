import moment from 'moment';
import React, { useContext, useState } from 'react';
import { userContext } from '../../../../context/User';
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

export default function Dayli({ appointments }: Props) {
    const { user } = useContext(userContext);
    const [worker, setWorker] = useState(user.workers[0]);
    const format = "YYYY-MM-DD";
    const today = moment(new Date()).format(format);
    const handleChange = (index: number) => {
        setWorker(user.workers[index]);
    };
    return (
        <section>
            <article className="workers">
                {user.workers.map((worker, i) =>
                    <div className="worker" onClick={() => handleChange(i)}>
                        <img src={worker.profile} alt={worker.name} />
                        <p>{worker.name}</p>
                    </div>
                )}
            </article>

            <table>
                <thead>
                    <tr>
                        <th>שעה</th>
                        <th>לקוח</th>
                        <th>תספורת</th>
                    </tr>
                </thead>
                <tbody>
                    {/* {worker.availableTimes.map((time, i) => { */}
                    {appointments.map((ap, i) => {
                        console.log(ap);
                        // && time === ap.time
                        // const date = Number(new Date(ap.date).getDate());
                        if (ap.date === today) {
                            < tr key={i}>
                                {ap.client.fullName}
                            </tr>
                            // return <p className="red"></p>
                        };

                    })}
                    {/* } */}
                    {/* )} */}
                </tbody>
            </table>
        </section >
    )
}

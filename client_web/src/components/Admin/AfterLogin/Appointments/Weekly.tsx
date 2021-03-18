import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import moment from "moment";
import { userContext } from '../../../../context/User';
import { IAppointment } from "../../../../interfaces"

type Props = {
  appointments: IAppointment[]
};

export default function Weekly({ appointments }: Props) {
  const { user } = useContext(userContext);
  const d: number[] = [];
  const [days, setDays] = useState(d);
  const [worker, setWorker] = useState(user.workers[0]);
  interface Ida {
    date: number, aps: IAppointment[]
  }

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

  const handleChange = (index: number) => {
    setWorker(user.workers[index]);
  };

  return (
    <section className="weekly">
      <article className="workers">
        {user.workers.map((worker, i) =>
          <div className="worker" onClick={() => handleChange(i)}>
            <img src={worker.profile} alt={worker.name} />
            <p>{worker.name}</p>
          </div>
        )}
      </article>
      <table className="board">
        <tr className="days">
          <th>שעה / תאריך</th>
          {days.map((day, i) =>
            <th key={i}>{day}</th>
          )}
        </tr>
        {/* {console.log(worker)} */}
        {worker.availableTimes.map((time, i) =>
          <tr key={time} className="hour" >
            <td className="time">{time}</td>
            <td className="appointment">
              {appointments.map(ap => {
                const date = Number(new Date(ap.date).getDate());
                if (date === days[0] && time === ap.time && ap.barber === worker.name) {
                  return <p className="red">{ap.client.fullName}</p>
                }
              })}
            </td>
            <td className="appointment">
              {appointments.map(ap => {
                const date = Number(new Date(ap.date).getDate());
                if (date === days[1] && time === ap.time && ap.barber === worker.name) {
                  return <p className="red">{ap.client.fullName}</p>
                }
              })}
            </td>
            <td className="appointment">
              {appointments.map(ap => {
                const date = Number(new Date(ap.date).getDate());
                if (date === days[2] && time === ap.time && ap.barber === worker.name) {
                  return <p className="red">{ap.client.fullName}</p>
                }
              })}
            </td>
            <td className="appointment">
              {appointments.map(ap => {
                const date = Number(new Date(ap.date).getDate());
                if (date === days[3] && time === ap.time && ap.barber === worker.name) {
                  return <p className="red"
                  //  onClick={() => {
                  //     alert(`clicked ${ap.date} ${ap.time}`);
                  // }}
                  >
                    {ap.client.fullName}</p>
                }
              })}
            </td>
            <td className="appointment">
              {appointments.map(ap => {
                const date = Number(new Date(ap.date).getDate());
                if (date === days[4] && time === ap.time && ap.barber === worker.name) {
                  return <p className="red">{ap.client.fullName}</p>
                }
              })}
            </td>
            <td className="appointment">
              {appointments.map(ap => {
                const date = Number(new Date(ap.date).getDate());
                if (date === days[5] && time === ap.time && ap.barber === worker.name) {
                  return <p className="red">{ap.client.fullName}</p>
                }
              })}
            </td>
          </tr>
        )}
      </table>
    </section >
  )
}

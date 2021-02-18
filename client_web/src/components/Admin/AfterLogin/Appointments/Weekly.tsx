import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import moment from "moment";
import { userContext } from '../../../../context/User';
import {IAppointment} from "../../../../interfaces"

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

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const filterWorkerById = user.workers.filter((w: any, i: any) => {
      return w._id === e.target.value
    });
    setWorker(filterWorkerById[0])
  };

  return (
    <section className="weekly">
      <select title="select worker" name="" id="" onChange={handleChange}>
        {user.workers.map(worker =>
          <option value={worker._id}>{worker.name}</option>
        )}
      </select>
      <article className="days">
        <div>שעה / תאריך</div>
        {days.map((day, i) =>
          <div key={i}>{day}</div>
        )}
      </article>
      <article className="board">
        {/* {console.log(worker)} */}
        {worker.availableTimes.map((time, i) =>
          <div key={time} className="hour" >
            <div className="time">{time}</div>
            <div className="appointment">
              {appointments.map(ap => {
                const date = Number(new Date(ap.date).getDate());
                if (date === days[0] && time === ap.time && ap.barber === worker.name) {
                  return <p className="red">{ap.client.fullName}</p>
                }
              })}
            </div>
            <div className="appointment">
              {appointments.map(ap => {
                const date = Number(new Date(ap.date).getDate());
                if (date === days[1] && time === ap.time && ap.barber === worker.name) {
                  return <p className="red">{ap.client.fullName}</p>
                }
              })}
            </div>
            <div className="appointment">
              {appointments.map(ap => {
                const date = Number(new Date(ap.date).getDate());
                if (date === days[2] && time === ap.time && ap.barber === worker.name) {
                  return <p className="red">{ap.client.fullName}</p>
                }
              })}
            </div>
            <div className="appointment">
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
            </div>
            <div className="appointment">
              {appointments.map(ap => {
                const date = Number(new Date(ap.date).getDate());
                if (date === days[4] && time === ap.time && ap.barber === worker.name) {
                  return <p className="red">{ap.client.fullName}</p>
                }
              })}
            </div>
            <div className="appointment">
              {appointments.map(ap => {
                const date = Number(new Date(ap.date).getDate());
                if (date === days[5] && time === ap.time && ap.barber === worker.name) {
                  return <p className="red">{ap.client.fullName}</p>
                }
              })}
            </div>
          </div>
        )}
      </article>
    </section >
  )
}

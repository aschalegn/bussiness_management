import React, { useContext, useEffect, useState } from 'react';
import moment from "moment";
import 'moment-timezone';
import { userContext } from '../../../../context/User';
import { IAppointment } from "../../../../interfaces"

type Props = {
  appointments: IAppointment[]
};

export default function Weekly({ appointments }: Props) {
  const { user } = useContext(userContext);
  const [days, setDays] = useState<String[]>([""]);
  const [worker, setWorker] = useState(user.workers[0]);
  const d = ["א", "ב", "ג", "ד", "ה", "ו", "ש"];
  useEffect(() => {
    getCurrentWeekDays();
    console.log(appointments);
    
  }, []);

  const getCurrentWeekDays = () => {
    const from_date = moment().startOf('week').toDate();
    const localDays = [];
    for (let i = 0; i < 6; i++) {
      const date = new Date(moment(from_date).add(i + 1, "days").toString());
      date.setUTCHours(0, 0, 0, 0);
      localDays.push(date.toISOString());
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
          <div className="worker" onClick={() => handleChange(i)} key={i}>
            <img src={worker.profile} alt={worker.name} />
            <p>{worker.name}</p>
          </div>
        )}
      </article>
      <table className="board">
        <tbody>
          <tr className="days">
            <th>שעה / תאריך</th>
            {days.map((day, i) =>
              <th key={i}>{new Date(day.toString()).getDate()} <br />{d[i]}</th>
            )}
          </tr>
          {worker.availableTimes.map((time, i) =>
            <tr key={time} className="hour" >
              <td className="time">{time}</td>
              <td className="appointment">
                {appointments.map((ap, i) => {
                  const date = new Date(ap.date).toISOString();
                  // console.log(date, days[1]);
                  if (date === days[0] && time === ap.time && ap.barber === worker.name) {
                   
                   
                    return <p className="red" key={i}>{ap.client.fullName}</p>
                  }
                })}
              </td>
              <td className="appointment">
                {appointments.map((ap, i) => {
                  const date = new Date(ap.date).toISOString();
                  if (date === days[1] && time === ap.time && ap.barber === worker.name) {
                    return <p className="red" key={i}>{ap.client.fullName}</p>
                  }
                })}
              </td>
              <td className="appointment">
                {appointments.map((ap, i) => {
                  const date = new Date(ap.date).toISOString();
                  if (date === days[2] && time === ap.time && ap.barber === worker.name) {
                    return <p className="red" key={i}>{ap.client.fullName}</p>
                  }
                })}
              </td>
              <td className="appointment">
                {appointments.map((ap, i) => {
                  const date = new Date(ap.date).toISOString();
                  if (date === days[3] && time === ap.time && ap.barber === worker.name) {
                    return <p className="red" key={i}>
                      {ap.client.fullName}</p>
                  }
                })}
              </td>
              <td className="appointment">
                {appointments.map((ap, i) => {
                  const date = new Date(ap.date).toISOString();
                  if (date === days[4] && time === ap.time && ap.barber === worker.name) {
                    return <p className="red" key={i}>{ap.client.fullName}</p>
                  }
                })}
              </td>
              <td className="appointment">
                {appointments.map((ap, i) => {
                  const date = new Date(ap.date).toISOString();
                  if (date === days[5] && time === ap.time && ap.barber === worker.name) {
                    return <p className="red" key={i}>{ap.client.fullName}</p>
                  }
                })}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </section >
  )
}

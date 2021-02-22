import React, { ChangeEvent, useContext, useEffect, useState } from 'react'
import moment from "moment";
import { userContext } from '../../../context/User';
import { appointmentContext } from '../../../context/Appointments';
import MakeAppointment from './MakeAppointment';
import './appointment.css';

export default function Appointment() {
    const d: number[] = [];
    const s: string[] = [];
    const a: any[] = []
    const [days, setDays] = useState(d);
    const [open, setOpen] = useState(false);
    const [selectDay, setSelectDay] = useState('');
    const [selectTime, setSelectTime] = useState('');
    const [arr, setArr] = useState(s);
    const [isCatch, setCatch] = useState(false);

    const { appointments, getAppointments } = useContext(appointmentContext);
    useEffect(() => {
        getAppointments("6028e4f2ed8a283230f4bc6c");
        getCurrentWeekDays();
        return () => {

        }
    }, []);
    const { user } = useContext(userContext);

    const [worker, setWorker] = useState(user.businesses[0].workers[0]);
    const getCurrentWeekDays = () => {
        const from_date = moment().startOf('week');
        const month = from_date.toDate().getMonth() + 1;
        const localDays = [];
        const temp = [];
        function checkDateX(x: any) {
            if (x < 10) {
                return x = '0' + x
            }
            else {
                return x
            }

        }
        for (let i = 0; i < 6; i++) {
            localDays.push(from_date.toDate().getDate() + i);
            const y = `${from_date.toDate().getFullYear()}-${checkDateX(month)}-${from_date.toDate().getDate() + i}`;
            temp.push(y);
        }
        setDays(localDays);
        setArr(temp);
    };

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const filterWorkerById = user.businesses[0].workers.filter((w: any, i: any) => {
            return w._id === e.target.value
        });
        setWorker(filterWorkerById[0])
    };

    const filterTimes = (time: any,index:number) => {
        let el: any
        for (let i = 0; i < appointments.length; i++) {
            const element = appointments[i];
            const date = Number(new Date(element.date).getDate());
            if (date === days[index] && time === element.time && element.barber === worker.name) {
                el = <p className='catch' >{time}</p>
                break;
            }
        }
        return el
    }

    const clickHandler = (time:any,i:number) =>{
        setOpen(!open)
        setSelectDay(arr[i])
        setSelectTime(time)
    }
    return (
        <section className="weekly">
            {open ? <MakeAppointment open={open} setOpen={setOpen} worker={worker} selectDay={selectDay} selectTime={selectTime} /> : ''}
            <select name="" id="" onChange={handleChange}>
                {user.businesses[0].workers.map(worker =>
                    <option key={worker._id} value={worker._id} >{worker.name}</option>
                )}
            </select>

            <table className='board'>
                <tr className="days">
                    {/* <th>שעה / תאריך</th> */}
                    {days.map((day, i) =>
                        <th key={i}>{day}</th>
                    )}
                </tr>

                {worker.availableTimes.map((time: any, i) =>
                    <tr key={time} className="hour"  >
                        <td className="times">
                       {filterTimes(time,0)? filterTimes(time,0): <p className='time' onClick={()=>clickHandler(time,0)}>{time}</p>}
                        </td>
                        <td className="times" onClick={() => clickHandler(time,1)}>
                            {filterTimes(time,1)? filterTimes(time,1): <p className='time'>{time}</p>}
                        </td>
                        <td className="times" onClick={() => clickHandler(time,2)}>
                            {filterTimes(time,2)? filterTimes(time,2): <p className='time'>{time}</p>}
                        </td>
                        <td className="times" onClick={() => clickHandler(time,3)}>
                            {filterTimes(time,3)? filterTimes(time,3): <p className='time'>{time}</p>}
                        </td>
                        <td className="times" onClick={() => clickHandler(time,4)}>
                            {filterTimes(time,4)? filterTimes(time,4): <p className='time'>{time}</p>}
                        </td>
                        <td className="times" onClick={() => clickHandler(time,5)}>
                            {filterTimes(time,5)? filterTimes(time,5): <p className='time'>{time}</p>}
                        </td>

                    </tr>
                )}
            </table>


        </section >

    )
}

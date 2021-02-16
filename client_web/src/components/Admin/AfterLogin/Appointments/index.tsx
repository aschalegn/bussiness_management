import React, { useState, useEffect, useContext } from 'react';
import AdminNav from '../../../Layouts/AppBar/AdminNav';
import Dayli from './Dayli';
import "./Appointments.css";
import { appointmentContext } from '../../../../context/Appointments';
import Weekly from './Weekly';

export default function Appointments() {
    const [filter, setFilter] = useState('week');
    const { appointments, getAppointments } = useContext(appointmentContext);
    useEffect(() => {
        getAppointments("6028e4f2ed8a283230f4bc6c");
        return () => {

        }
    }, []);
    return (
        <section className="Appointments">
            <AdminNav location="תורים" />
            {filter}
            <ul className="filterBy">
                <li onClick={() => { setFilter("day") }}>יומי /</li>
                <li onClick={() => { setFilter("week") }}>שבועי</li>
            </ul>
            <article>
                {
                    filter === "day" ? <Dayli appointments={appointments} />
                        :
                        <Weekly appointments={appointments} />
                }
            </article>
        </section>
    )
}

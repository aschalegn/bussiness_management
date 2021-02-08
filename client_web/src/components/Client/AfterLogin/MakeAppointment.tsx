import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Button } from '@material-ui/core';

export default function MakeAppointment() {
    const [barbareSelected, setBarbareSelected] = useState(false);
    const [dateSelected, setDateSelected] = useState(false);
    const [timeselected, setTimeSelected] = useState(false);
    const [dates, setDates] = useState([]);
    const [hours, setHours] = useState([]);
    const body = { worker: "", style: "", hour: "", date: "" }

    const getAppointments = (workerId: string) => {
        console.log(workerId);
    }
    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(body);
    }

    return (
        <>
            <h1>Appointment page</h1>
            <form onSubmit={submitHandler}>
                <select title="barber" name="barbare" id="barbare"
                    onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                        getAppointments(event.target.value);
                        body["worker"] = event.target.value;
                        setBarbareSelected(true);
                    }}
                >
                    <option value="Yossi" defaultValue="true">Yosi</option>
                    <option value="Moshe">Moshe</option>
                </select>
                <br />
                <input title="pick date" type="date" name="date" id="date"
                    disabled={!barbareSelected}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        body["date"] = e.target.value;
                        setDateSelected(true);
                    }}
                />
                <br />
                <input title="pick time" type="time" name="time" id="time"
                    disabled={!dateSelected}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        body["hour"] = e.target.value;
                        setTimeSelected(true);
                    }}
                />
                <br />
                <select title="style" name="style" id="style"
                    disabled={!timeselected}
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                        body["style"] = e.target.value;
                    }}
                >
                    <option value="Boy">Boy</option>
                    <option value="Man">Man</option>
                </select>
                <br />
                <Button variant="contained" color="primary" type="submit">קבע</Button>
            </form>
        </>
    )
}

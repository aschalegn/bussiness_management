import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { baseURL } from '../../../utils';
import { userContext } from '../../../context/User';
import { Button, Dialog } from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

const AllAppointmentByClient = () => {

    const user = useContext(userContext)
    const [appointments, setAppointments] = useState();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClickClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        const userId = user.user._id
        axios.get(`${baseURL}appointment/client/${userId}`)
            .then((res) => {
                setAppointments(res.data.appointments);
            })
            .catch((err) => { console.log(err) })
    }, []);

    return (
        <>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                היסטוריית תורים
            </Button>
            <Dialog open={open} onClose={handleClickClose} aria-labelledby="form-dialog-title">
                <NavigateNextIcon onClick={handleClickClose} />
                <h1>היסטוריית תורים</h1>
                <table>
                    <thead>
                        <tr>
                            <th>תאריך</th>
                            <th>שעה</th>
                            <th>תספורת</th>
                            <th>ספר</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments && appointments.map((appointment, i) => {
                            return <tr key={i}>
                                 <td>{appointment.date}</td>
                                <td>{appointment.time}</td>
                                <td>{appointment.style || "fdgf"}</td>
                                <td>{appointment.barber}</td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </Dialog >
        </>
    )
}

export default AllAppointmentByClient;
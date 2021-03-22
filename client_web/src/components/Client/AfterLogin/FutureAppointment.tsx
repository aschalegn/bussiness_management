import React, { useEffect, useState, useContext } from 'react';
import { baseURL } from '../../../utils';
import { userContext } from '../../../context/User';
import axios from 'axios';
import { Button, Dialog } from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

export default function FutureAppointment() {

    const user = useContext(userContext)
    const [futurTurn, setFuturTurn] = useState(Object);
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
                let arr = res.data.appointments;
                setFuturTurn(arr[arr.length - 1]);
            })
            .catch((err) => { console.log(err) })
    }, []);

    const updateTurn = () => {
        const data = {
            barber: 'worker2',
            date: '2021-02-29',
            time: '12:40'
        };
        axios.patch(`${baseURL}appointment/${futurTurn._id}`, data)
            .then(res => {
                alert('התור עודכן בהצלחה');
                setOpen(false);
            })
            .catch(err => {
                console.log(err);

            })
    }

    const deleteTurn = () => {
        axios.delete(`${baseURL}appointment/${futurTurn._id}`)
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)

            })
    }

    console.log(futurTurn);

    return (
        <>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                תור עתידי
            </Button>
            <Dialog open={open} onClose={handleClickClose} aria-labelledby="form-dialog-title">
                <NavigateNextIcon onClick={handleClickClose} />
                <h4> התור העתידי שנקבע לך הוא בתאריך <br /><br />ה-  <b>{futurTurn.date} </b>בשעה <b>{futurTurn.time}</b> אצל <b>{futurTurn.barber}</b></h4>
                <p>מצפים לראותך</p>
                <p>(שם העסק) צוות</p>
                <p>ניתן לבטל או לעדכן תור עד <b>שעתיים לפני התור</b></p>
                <button onClick={updateTurn}>עדכון</button>
                <br /><br />
                <button onClick={deleteTurn}>מחיקה</button>
            </Dialog>
        </>
    )
}

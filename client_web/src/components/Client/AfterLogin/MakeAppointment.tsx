import React, { FormEvent, useContext, useState } from 'react';
import { baseURL } from '../../../utils';
import axios from 'axios';
import { IService } from "../../../interfaces";
import { userContext } from '../../../context/User';
import { Button, Dialog, DialogActions, DialogTitle } from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import "./makeAppointment.css";

type Props = { open: boolean, setOpen: any, worker: any, selectDay: any, selectTime: any }

export default function MakeAppointment({ open, setOpen, worker, selectDay, selectTime }: Props) {
    const { user } = useContext(userContext);
    const [style, setStyle] = useState<IService>();
    const [selected, setSelected] = useState(0);
    const handleClickClose = () => {
        setOpen(false);
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const body = {
            barber: worker.name,
            date: selectDay,
            time: selectTime,
            style,
            business: user.businesses[0]
        };

        axios.post(`${baseURL}appointment/6028e4f2ed8a283230f4bc6c/${user._id}`, body)
            .then(res => {
                if (res.status === 201) {
                    handleClickClose();
                    alert('התור נקבע');
                }else{
                    handleClickClose();
                    alert('יש לך כבר תור לעידכון התור אנא הכנס לתור עתידי')
                }
               console.log(res.status);
                
            })
            .catch(err => {
                console.log(err);
            })
    };

    return (
        <>
            <Dialog open={open} onClose={handleClickClose} aria-labelledby="form-dialog-title" className="makeAppointment">
                <NavigateNextIcon onClick={handleClickClose} />
                <DialogTitle id="form-turn-title"> קביעת תור</DialogTitle>
                <form onSubmit={handleSubmit}>
                    התור הנבחר הוא <br />
                    בתאריך: {selectDay}<br />
                    בשעה: {selectTime}<br />
                    אצל: {worker.name}<br />
                    <h3 className="ap_title">בחר תספורת</h3>
                    <section id="style" className="select_style">
                        {user.businesses[0].services.map((ser, i) =>
                            <article key={i} onClick={() => {
                                setStyle(ser);
                                setSelected(i);
                            }} className={i === selected ? "selected" : ''}>
                                <img src={ser.img} alt="" />
                                <p>{ser.name} </p>
                                <p>מחיר: {ser.price}</p>
                            </article>
                        )}
                    </section>
                    <DialogActions>
                        <Button onClick={handleClickClose} color="secondary">
                            חזור
                        </Button>
                        <Button type='submit' color="primary">
                            לאישור
                        </Button>
                    </DialogActions>
                </form>
            </Dialog >
        </>
    )
}

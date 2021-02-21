import React, { useState, FormEvent, useContext, useEffect } from 'react';
import { baseURL } from '../../../utils';
import axios from 'axios';
import { appointmentContext } from '../../../context/Appointments';
import { userContext } from '../../../context/User';
import Date from './Date';
import {
    Button, Dialog, DialogActions, DialogTitle,
    createStyles, makeStyles, Theme
} from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import "./makeAppointment.css";
import moment from "moment";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
    }),
);

type Props = { open: boolean, setOpen: any, worker: any, selectDay: any, selectTime: any }

export default function MakeAppointment({ open, setOpen, worker, selectDay, selectTime }: Props) {

    const classes = useStyles();
    const { appointments, getAppointments } = useContext(appointmentContext);
    const [allWorkers, setAllWorkers] = useState<any[]>([]);
    // const [open, setOpen] = React.useState(false);
    const [time, setTime] = useState('');
    const [workerSelected, setWorkerSelected] = useState({ availableTimes: [], name: '' });
    const [date, setDate] = useState('');
    const [turns, setTurns] = useState<any[]>([]);
    const { user } = useContext(userContext);
    const [inputValue, setInputValue] = useState(moment().format("YYYY-MM-DD"));

    // let workerSelected = { availableTimes: [], name: '' }
    console.log(worker, selectDay, selectTime);


    useEffect(() => {
        getAppointments("6028e4f2ed8a283230f4bc6c");
        setInputValue(String(selectDay))
        return () => {

        }
    }, []);

    // const handleClickOpen = () => {
    //     getAvailableTimes();
    //     setOpen(true);
    // };

    const handleClickClose = () => {
        setOpen(false);
    };

    const getAvailableTimes = () => {
        axios.get(`${baseURL}business/6028e4f2ed8a283230f4bc6c`)
            .then((res) => {
                setAllWorkers(res.data);
            })
            .catch((err) => { console.log(err); })
    }

    const handleChange = (event: any) => {
        if (event.target.name === 'barber') {
            const filterWorkerById = allWorkers.filter((w: any, i: any) => {
                return w._id === event.target.value
            });
            console.log(filterWorkerById[0]);
            setWorkerSelected(filterWorkerById[0])
            // workerSelected = filterWorkerById[0];
            console.log(workerSelected.name);

            // filterTimes();
        }
        if (event.target.name === 'time') {
            setTime(event.target.value);
        }
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const body = {
           barber: worker.name,
           date: inputValue,
           time: selectTime
        };
        console.log(body);

        axios.post(`${baseURL}appointment/6028e4f2ed8a283230f4bc6c/${user._id}`, body)
            .then(res => {
                if (res.status === 201) {
                    handleClickClose();
                    alert('success');
                }
            })
            .catch(err => {
                console.log(err);
            })
    }



    const filterTimes = () => {
        console.log(workerSelected);
        const allTurns = workerSelected.availableTimes

        for (let i = 0; i < allTurns.length; i++) {
            const element = allTurns[i];
            for (let j = 0; j < appointments.length; j++) {
                const caught = appointments[j];
                // console.log(element , caught.time );
                // console.log(caught.date ,date );
                // console.log(caught.barber ,workerSelected.name );
                if (element === caught.time && caught.date === date && caught.barber === workerSelected.name) {
                    allTurns.splice(i, 1);

                }
            }
        }
        console.log(allTurns);
        setTurns(allTurns);
    }

    return (
        <>
            {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                קביעת תור
            </Button> */}
            {console.log(inputValue, 'inputValue')}
            <Dialog open={open} onClose={handleClickClose} aria-labelledby="form-dialog-title">
                <NavigateNextIcon onClick={handleClickClose} />
                <DialogTitle id="form-turn-title"> הוספת תור</DialogTitle>
                <form onSubmit={handleSubmit}>
                    התור הנבחר הוא <br />
             בתאריך: {selectDay}<br />
             בשעה: {selectTime}<br />
             אצל: {worker.name}<br />
                    {console.log(worker.name, selectTime, selectDay)}

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

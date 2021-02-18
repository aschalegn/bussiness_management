import React, { useState, FormEvent, useContext, useEffect } from 'react';
import { baseURL } from '../../../utils';
import axios from 'axios';
import { appointmentContext } from '../../../context/Appointments';
import { userContext } from '../../../context/User';
import Date from './Date';
import {
    Button, Dialog, DialogActions, DialogTitle,
    createStyles, makeStyles, Theme, Grid,
    FormControl, Select, MenuItem, InputLabel
} from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import "./makeAppointment.css";

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


export default function MakeAppointment() {

    const classes = useStyles();
    const { appointments, getAppointments } = useContext(appointmentContext);
    const [allWorkers, setAllWorkers] = useState<any[]>([]);
    const [open, setOpen] = React.useState(false);
    const [time, setTime] = useState('');
    const [workerSelected, setWorkerSelected] = useState({ availableTimes: [], name: '' });
    const [date, setDate] = useState('');
    const [turns, setTurns] = useState<any[]>([]);
    const { user } = useContext(userContext);

    // let workerSelected = { availableTimes: [], name: '' }

    useEffect(() => {
        getAppointments("6028e4f2ed8a283230f4bc6c");
        return () => {

        }
    }, []);

    const handleClickOpen = () => {
        getAvailableTimes();
        setOpen(true);
    };
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
            barber: workerSelected.name,
            date,
            time
        };      
        console.log(body.barber);
          
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
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                קביעת תור
            </Button>
            <Dialog open={open} onClose={handleClickClose} aria-labelledby="form-dialog-title">
                <NavigateNextIcon onClick={handleClickClose} />
                <DialogTitle id="form-turn-title"> הוספת תור</DialogTitle>
                <form onSubmit={handleSubmit}>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label">בחר ספר</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            name='barber'
                            onChange={handleChange}
                            required
                        >
                            {allWorkers.map((worker: any, i: any) =>
                                <MenuItem key={i} value={worker._id}>{worker.name}</MenuItem>
                            )}
                        </Select>
                    </FormControl>
                    <Grid container justify="space-around">
                        <Date getUserDate={setDate} filterTimes={filterTimes}/>
                    </Grid>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label">בחר שעה</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            name='time'
                            onChange={handleChange}
                            required
                        >
                            {turns.map((time: any, i: any) =>
                                <MenuItem key={i} value={time}>{time}</MenuItem>
                            )}
                        </Select>
                    </FormControl>
                    <DialogActions>

                        <Button onClick={handleClickClose} color="secondary">
                            חזור
                        </Button>
                        <Button type='submit' color="primary">
                            קבע
                        </Button>
                    </DialogActions>
                </form>
            </Dialog >

        </>
    )
}

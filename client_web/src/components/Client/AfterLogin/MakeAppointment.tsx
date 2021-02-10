import React, { useState, FormEvent } from 'react';
import { baseURL } from '../../../utils';
import axios from 'axios';
import {
    Button, Dialog, DialogActions, DialogTitle, DialogContent,
    createStyles, makeStyles, Theme, Grid,
    FormControl, Select, MenuItem, InputLabel

} from '@material-ui/core';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';


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

    const [allWorkers, setAllWorkers] = useState([]);

    const [open, setOpen] = React.useState(false);
    const [barbareSelected, setBarbareSelected] = useState(false);
    const [dateSelected, setDateSelected] = useState(false);
    const [timeselected, setTimeSelected] = useState(false);
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState('');
    const [barber, setBarber] = React.useState('');
    const [workerSelected, setWorkerSelected] = useState({ availableTimes: [], name: '' });



    const handleClickOpen = () => {
        getAvailableTimes();
        setOpen(true);

    };
    const handleClickClose = () => {
        setOpen(false);
    };

    const getAvailableTimes = () => {
        axios.get(`${baseURL}business/60213db13f53a228b4a40497`)
            .then((res) => {
                console.log(res.data);
                setAllWorkers(res.data);
            })
            .catch((err) => { console.log(err); })
    }


    const handleChange = (event: any) => {
        if (event.target.name === 'barber') {
            const filterWorkerById = allWorkers.filter((w: any, i: any) => {
                return w._id === event.target.value
            });
            setWorkerSelected(filterWorkerById[0]);
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
        console.log(body);
        axios.post(`${baseURL}appointment/60213db13f53a228b4a40497/6023ade3ea2bfc363c7d12cc`, body)
            .then(res => {
                if (res.status === 201) {
                    console.log(res.data);
                }
            })
            .catch(err => {
                console.log(err);

            })

    }

    const handleDateChange = (date: any) => {
        setDate(date);
    };


    return (
        <>

            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                קביעת תור
            </Button>

            <Dialog open={open} onClose={handleClickClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">הוספת תור</DialogTitle>
                <DialogContent>
                    {/* <Button onClick={getAvailableTimes}>הדפס</Button> */}
                </DialogContent>

                <form onSubmit={handleSubmit}>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label">בחר ספר</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            name='barber'
                            onChange={handleChange}
                        >
                            {allWorkers.map((worker: any, i: any) =>
                                <MenuItem key={i} value={worker._id}>{worker.name}</MenuItem>
                            )}

                        </Select>
                    </FormControl>

                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid container justify="space-around">
                            <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                format="MM/dd/yyyy"
                                margin="normal"
                                id="date-picker-inline"
                                label="בחר תאריך"
                                value={date}
                                // name="time"
                                onChange={handleDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </Grid>
                    </MuiPickersUtilsProvider>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label">בחר שעה</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            name='time'
                            onChange={handleChange}
                        >
                            {workerSelected.availableTimes.map((time: any, i: any) =>
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

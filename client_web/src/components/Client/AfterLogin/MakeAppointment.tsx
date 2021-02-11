import React, { useState, FormEvent } from 'react';
import { baseURL } from '../../../utils';
import axios from 'axios';
import {
    Button, Dialog, DialogActions, DialogTitle, DialogContent,
    createStyles, makeStyles, Theme, Grid,
    FormControl, Select, MenuItem, InputLabel

} from '@material-ui/core';

import MomentUtils from "@date-io/moment";
import moment from "moment";
import DateFnsUtils from "@date-io/date-fns"; // choose your lib
import { DatePicker, MuiPickersUtilsProvider, MuiPickersContext } from "@material-ui/pickers";


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
    // const [selectedDate, setSelectedDate] = useState(null);
    const [time, setTime] = useState('');
    // const [barber, setBarber] = React.useState('');
    const [workerSelected, setWorkerSelected] = useState({ availableTimes: [], name: '' });
    const [selectedDate, setDate] = useState(moment());
    const [inputValue, setInputValue] = useState(moment().format("YYYY-MM-DD"));
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
            date: inputValue,
            time
        };
        console.log(body);
        axios.post(`${baseURL}appointment/60213db13f53a228b4a40497/6023bdbaf819db495c0c3305`, body)
            .then(res => {
                if (res.status === 201) {
                    console.log(res.data);
                    handleClickClose();
                    alert('success');
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    const onDateChange = (date: any, value: any) => {
        setDate(date);
        setInputValue(value);
        console.log(selectedDate, inputValue);

    };

    const dateFormatter = (str: string) => {
        return str;
    };

    function shouldDisableYear(day: any, pickerProps: any) {
        return day.getDay() === 0 || day.getDay() === 6;
    }

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
                            required
                        >
                            {allWorkers.map((worker: any, i: any) =>
                                <MenuItem key={i} value={worker._id}>{worker.name}</MenuItem>
                            )}

                        </Select>
                    </FormControl>

                    {/* <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils}>
                        <Grid container justify="space-around"> */}
                    {/* <DatePicker
                                autoOk={true}
                                showTodayButton={true}

                                value={selectedDate}
                                format="dd-MM-yyyy"
                                inputValue={inputValue}
                                onChange={onDateChange}
                                rifmFormatter={dateFormatter}
                                shouldDisableDate={shouldDisableDate}
                            /> */}
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DatePicker
                            shouldDisableYear={shouldDisableYear}
                            value={selectedDate}
                            format="dd-MM-yyyy"
                            inputValue={inputValue}
                            onChange={onDateChange}
                            rifmFormatter={dateFormatter}
                        />
                    </MuiPickersUtilsProvider>
                    {/* </Grid>
                    </MuiPickersUtilsProvider> */}
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label">בחר שעה</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            name='time'
                            onChange={handleChange}
                            required
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

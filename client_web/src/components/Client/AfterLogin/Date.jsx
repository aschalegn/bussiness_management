import React, { useState } from "react";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { TextField } from "@material-ui/core";
import DateFnsUtils from '@date-io/date-fns';
import moment from "@date-io/moment";

function Date(props) {
    const [selectedDate, setDate] = useState(moment(""));
    const [inputValue, setInputValue] = useState(moment().format("yyyy-mm-dd"));
    const { getDate } = props;
    function shouldDisableDate(day, pickerProps) {
        const disabledDays = day.getDay() === 5 || day.getDay() === 6;
        return (disabledDays)
    }
    const onDateChange = (date, value) => {
        setDate(date);
        setInputValue(value);
        console.log(selectedDate, inputValue);
        getDate(value);
    };

    const dateFormatter = (str) => {
        return str;
    };
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
                shouldDisableDate={shouldDisableDate}
                value={selectedDate}
                format="yyyy-MM-dd"
                onChange={onDateChange}
                rifmFormatter={dateFormatter}
                renderInput={props => <TextField {...props} />}
            />
        </MuiPickersUtilsProvider>
    );
}

export default Date;
import React, { useState } from "react";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { TextField } from "@material-ui/core";
import MomentUtils from "@date-io/moment";
import moment from "moment";

function Date(props) {
    const [selectedDate, setDate] = useState(moment());
    const [inputValue, setInputValue] = useState(moment().format("YYYY-MM-DD"));

    const { getUserDate } = props;

    const shouldDisableDate =(date) => {
        // const disabledDays = day.getDay() === 5 || day.getDay() === 6;
        // return (disabledDays)
        // const x = date.getDay() === 0 || date.getDay() === 6;
// console.log(getDay());
    }

    const onDateChange = (date, value) => {
        setDate(date);
        setInputValue(value);
        getUserDate(value);
    };

    const dateFormatter = (str) => {
        return str;
    };
    return (
        <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils} >
            <KeyboardDatePicker
                shouldDisableDate={shouldDisableDate}
                autoOk={true}
                showTodayButton={true}

                value={selectedDate}
                format="YYYY-MM-DD"
                inputValue={inputValue}
                onChange={onDateChange}
                rifmFormatter={dateFormatter}
                renderInput={props => <TextField {...props} />}
            />
        </MuiPickersUtilsProvider>
    );
}

export default Date;
import React, { useState } from "react";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { TextField } from "@material-ui/core";
import MomentUtils from "@date-io/moment";
import moment from "moment";

function Date(props) {
    const [selectedDate, setDate] = useState(moment());
    const [inputValue, setInputValue] = useState(moment().format("YYYY-MM-DD"));
    const { getUserDate ,filterTimes} = props;

    const onDateChange = (date, value) => {
        setDate(date);
        setInputValue(value);
        getUserDate(value);
        filterTimes();
    };

    const dateFormatter = (str) => {
        return str;
    };

    return (
        <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils} >
            <KeyboardDatePicker
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
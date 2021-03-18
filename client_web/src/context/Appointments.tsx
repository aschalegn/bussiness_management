import axios from 'axios';
import React, { createContext, useState, useReducer, useEffect } from 'react';
import { IAppointment } from '../interfaces'
// interface IAppointment {
//     client: { fullName: string },
//     barber: string,
//     date: string,
//     time: string,
//     style: string,
//     bussiness: string,
// };

const appointments: Array<IAppointment> = [];
type Props = { children: JSX.Element };
export const appointmentContext = createContext({
    appointments: appointments,
    getAppointments: (id: string) => { }
});

const appointmentReducer = (state: any, action: any) => {
    const { type, payload } = action;
    switch (type) {
        case "GET_APPOINTMENTS":
            state = payload;
            break;
        default:
            break;
    }
    return state;
}

export default function AppointmentsProvider({ children }: Props) {
    const [appointments, dispatch] = useReducer(appointmentReducer, []);
    useEffect(() => {
      
    }, []);

    const getAppointments = (id: string) => {
        axios.get(`/api/appointment/business/${id}`)
            .then(res => {
                if (res.status === 200) {
                    dispatch({ type: "GET_APPOINTMENTS", payload: res.data.appointments });
                }
            });
    }

    return (
        <appointmentContext.Provider value={{ appointments, getAppointments }}>
            {children}
        </appointmentContext.Provider>
    )
}

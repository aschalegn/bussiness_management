import axios from 'axios';
import React, { createContext, useReducer, useEffect, useContext } from 'react';
import { IAppointment } from '../interfaces';
import socketClient from "socket.io-client";
import { userContext } from './User';

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
        case "ADD_APPOINTMENT":
            state = [...state, payload];
            break;
        case "DELETE_APPOINTMENT":
            state = state.filter((ap: IAppointment) => {
                return ap._id !== payload;
            });
            break;
        default:
            break;
    }

    return state;
}

export default function AppointmentsProvider({ children }: Props) {
    const [appointments, dispatch] = useReducer(appointmentReducer, []);
    const { user } = useContext(userContext)
    const io = socketClient.io(`/`);

    useEffect(() => {
        io.on("appontmentAdded", (data: any) => {
            const { businessId } = data;
            if (user._id === businessId) {
                dispatch({ type: 'ADD_APPOINTMENT', payload: data.data })
            };
        });
        io.on("appontmentDeleted", (data: any) => {
            const { businessId } = data;
            if (user._id === businessId) {
                dispatch({ type: 'DELETE_APPOINTMENT', payload: data.data })
            };
        });
    }, []);

    const getAppointments = (id: string) => {
        axios.get(`/api/appointment/business/${id}`)
            .then(res => {
                if (res.status === 200) {
                    dispatch({ type: "GET_APPOINTMENTS", payload: res.data });
                }
            });
    }

    return (
        <appointmentContext.Provider value={{ appointments, getAppointments }}>
            {children}
        </appointmentContext.Provider>
    )
}

import axios from 'axios';
import React, { createContext, useReducer } from 'react';
import { baseURL } from '../utils';
export const userContext = createContext({});

const userReducer = (state: any, action: any) => {
    const { type, payload } = action;
    switch (type) {
        case "SIGN_UP" || "SIGN_IN":
            state = payload;
            break;
        case "SIGN_OUT":
            state = null;
            break;
        default:
            break;
    }
    return state;
}

export default function UserProvider(props: any) {
    const [user, userDispatch] = useReducer(userReducer, null);
    const signUp = (body: any) => {
        axios.post(`${baseURL}/business`, {
            body
        }).then(res => {
            if (res.status === 201) {
                userDispatch({ type: "SIGN_UP", payload: res.data });
            }
        }).catch((err) => {
            console.log(err, 'some erorr')
        })
    }

    return (
        <userContext.Provider value={{ user, signUp }}>
            {props.children}
        </userContext.Provider>
    )
}

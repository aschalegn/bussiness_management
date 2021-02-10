import React, { createContext, useReducer, useEffect } from 'react';
import axios from 'axios';
import { baseURL } from '../utils';

export const userContext = createContext({
    user: {},
    signUp: (body: any) => { },
    signUpClient: (fullName: any, phone: any) => { },
    signIn: (email: string, password: string) => { },
    signInClient: (phone: string) => { }
});

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
    useEffect(() => {
        axios.get(`${baseURL}isUser`, { withCredentials: true })
            .then(res => {
                const type = res.data.type
                const payload = { ...res.data.body, type }
                console.log(payload);
                { userDispatch({ type: "SIGN_IN", payload: payload }); }
            })
    }, []);

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

    const signIn = (email: string, password: string) => {
        axios.get(`${baseURL}business/login?email=${email}&password=${password}`, { withCredentials: true })
            .then(res => {
                if (res.status === 200)
                    userDispatch({ type: "SIGN_UP", payload: res.data });
            })
            .catch(err => {
                console.log(err);
            })
    }

    const signUpClient = (fullName: any, phone: any) => {
        axios.post(`${baseURL}client/signUp/60213e701f365014cc0f8fb4`, {
            fullName,
            phone
        }).then(res => {
            if (res.status === 201) {
                userDispatch({ type: "SIGN_UP", payload: res.data });
            }
        }).catch((err) => {
            console.log(err, 'some erorr')
        })
    }

    const signInClient = (phone: string) => {
        axios.get(`${baseURL}client/signIn/60213e701f365014cc0f8fb4?phone=${phone}`, { withCredentials: true })
            .then(res => {
                if (res.status === 200)
                    userDispatch({ type: "SIGN_UP", payload: res.data });
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <userContext.Provider value={{ user, signUp, signUpClient, signIn, signInClient }}>
            {props.children}
        </userContext.Provider>
    )
}

import React, { createContext, useReducer, useEffect } from 'react';
import axios from 'axios';
import { IWorker, IAppointment, IBusiness } from "../interfaces";
const workers: IWorker[] = [];
const appointments: IAppointment[] = [];
const businesses: IBusiness[] = [];
export const userContext = createContext({
    user: {
        workers,
        appointments,
        _id: '',
        type: '',
        name: '',
        phones: [""],
        email: '',
        times: { openAt: '', closeAt: '' },
        businesses,
        socialMedia: [{ name: '', link: '' }],
        role: "",
        logo: '',
        poster: '',
        category: '',
        services: [{ name: '', price: 0, img: '' }],
        profile: ''
    },
    signUp: (body: any) => { },
    signIn: (email: string, password: string) => { },
    signUpClient: (fullName: any, phone: any) => { },
    signInClient: (phone: string) => { },
    signOut: () => { }
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
        axios.get(`/api/isuser`, { withCredentials: true })
            .then(res => {
                if (res.status === 200) {
                    const type = res.data.type
                    const payload = { ...res.data.body, type };
                    userDispatch({ type: "SIGN_UP", payload: payload });
                }
            }).catch(err => {
                console.log(err);
            });
    }, []);

    const signUp = (body: any) => {
        axios.post(`/api/business`, body, { withCredentials: true })
            .then(res => {
                if (res.status === 201) {
                    const type = res.data.type
                    const payload = { ...res.data.body, type }
                    userDispatch({ type: "SIGN_UP", payload: payload });
                }
            }).catch((err) => {
                console.log(err, 'some erorr')
            })
    }

    const signIn = (email: string, password: string) => {
        axios.get(`/api/business/login?email=${email}&password=${password}`, { withCredentials: true })
            .then(res => {
                if (res.status === 200) {
                    const type = res.data.type
                    const payload = { ...res.data.body, type }
                    userDispatch({ type: "SIGN_UP", payload: payload });
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    const signUpClient = (fullName: any, phone: any) => {
        const body = { fullName, phone };
        axios.post(`/api/client/signUp/6028e4f2ed8a283230f4bc6c`, body, { withCredentials: true })
            .then(res => {
                if (res.status === 201) {
                    const type = res.data.type
                    const business = res.data.businessId
                    const payload = { ...res.data.body, type, business }
                    userDispatch({ type: "SIGN_UP", payload: payload });
                }
            }).catch((err) => {
                console.log(err, 'some erorr')
            })
    }

    const signOut = () => {
        axios.get(`/api/logout`, { withCredentials: true })
            .then(res => {
                if (res.status === 200)
                    userDispatch({ type: "SIGN_OUT" });
            })
    }

    const signInClient = (phone: string) => {
        axios.get(`/api/client/signIn/services?phone=${phone}`, { withCredentials: true })
            .then(res => {
                if (res.status === 200) {
                    const type = res.data.type;
                    const business = res.data.businessId;
                    const payload = { ...res.data.body, type, business };
                    userDispatch({ type: "SIGN_UP", payload: payload });
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <userContext.Provider value={{ user, signUp, signUpClient, signIn, signInClient, signOut }}>
            {props.children}
        </userContext.Provider>
    )
}
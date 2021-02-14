import React, { useContext } from 'react';
import axios from 'axios';
import { baseURL } from '../../../utils';
import { userContext } from '../../../context/User';


const AllAppointmentByClient = () => {
    const user = useContext(userContext)

    const getAllClientAppointment = () => {
        console.log(user.user._id);
        const userId = user.user._id
        axios.get(`${baseURL}appointment/60213db13f53a228b4a40497/${userId}`)
            .then((res) => {
                console.log(res.data)
                // setAllWorkers(res.data)
            })
            .catch((err) => { console.log(err) })
    }
    return (
        <>
            <button onClick={getAllClientAppointment}>click me</button>
        </>
    )
}

export default AllAppointmentByClient;
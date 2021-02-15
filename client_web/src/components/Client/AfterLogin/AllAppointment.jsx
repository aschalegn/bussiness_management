import React, { useContext } from 'react';
import axios from 'axios';
import { baseURL } from '../../../utils';
import { userContext } from '../../../context/User';


const AllAppointmentByClient = () => {

    const user = useContext(userContext)

    const  getAll = () => {
        console.log(user.user._id);
        const userId = user.user._id
        axios.get(`${baseURL}appointment/client/${userId}`)
            .then((res) => {
                
                console.log(res.data, 'gfhggkhkh')
            })
            .catch((err) => { console.log(err,userId,'gfgjghhgwhgwhg') })
    }
    return (
        <>
            <button onClick={getAll}>click me</button>
        </>
    )
}

export default AllAppointmentByClient;
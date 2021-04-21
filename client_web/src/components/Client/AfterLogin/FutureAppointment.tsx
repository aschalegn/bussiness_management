import React, { useEffect, useState, useContext } from 'react';
import { baseURL } from '../../../utils';
import { userContext } from '../../../context/User';
import axios from 'axios';
import { Button, Dialog } from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import moment from 'moment';
import ClientNav from '../../Layouts/AppBar/ClientNav';
import './FutureTurn.css';
import Appointment from './appointment';

export default function FutureAppointment() {

    const user = useContext(userContext)
    const [futurTurn, setFuturTurn] = useState(Object);
    const [openUpdate, setOpenUpdate] = React.useState(false);
    const [openDelete, setOpenDelete] = React.useState(false);

    const handleClickOpenUpdateMetting = () => {
        setOpenUpdate(true);
    };
    const handleClickCloseUpdateMetting = () => {
        setOpenUpdate(false);
    };
    const handleClickOpenDeleteMetting = () => {
        setOpenDelete(true);
    };
    const handleClickCloseDeleteMetting = () => {
        setOpenDelete(false);
    };
    const businessName = user.user.businesses[0].name
    const workers = user.user.businesses[0].workers

    useEffect(() => {
        const userId = user.user._id
        axios.get(`${baseURL}appointment/client/${userId}`)
            .then((res) => {
                let arr = res.data.appointments;
                console.log(workers);

                setFuturTurn(arr[arr.length - 1]);
            })
            .catch((err) => { console.log(err) })
    }, []);

    const updateTurn = () => {
        const data = {
            barber: 'worker2',
            date: '2021-02-29',
            time: '12:40'
        };
        axios.patch(`${baseURL}appointment/${futurTurn._id}`, data)
            .then(res => {
                alert('התור עודכן בהצלחה');
                setOpenUpdate(false);
            })
            .catch(err => {
                console.log(err);
            })
    }

    const deleteTurn = () => {
        axios.delete(`${baseURL}appointment/${futurTurn._id}`)
            .then(res => {
                console.log(res, 'success')
            })
            .catch(err => {
                console.log(err, '------------ error ----------')
            })
    }

    const UpdateMetting = () => {
        return (

            <>
                <Button variant="outlined" color="secondary" onClick={handleClickOpenUpdateMetting} > עדכון </Button>
                {
                    futurTurn ?
                        <Dialog open={openUpdate} onClose={handleClickCloseUpdateMetting} aria-labelledby="form-dialog-title">
                            <NavigateNextIcon onClick={handleClickCloseUpdateMetting} />
                            <Appointment />
                        </Dialog>
                        :
                        ''
                }
            </>

        )
    }

    const DeleteMetting = () => {
        return (
            <>
                <Button variant="outlined" color="primary" onClick={deleteTurn}> מחיקה </Button>
                {
                    futurTurn ?
                        <Dialog open={openDelete} onClose={handleClickCloseDeleteMetting} aria-labelledby="form-dialog-title">
                            <NavigateNextIcon onClick={handleClickCloseDeleteMetting} />

                        </Dialog>
                        :
                        ''
                }
            </>

        )
    }
    return (
        <>
            <ClientNav location={"תור עתידי"} />
            <section>
                <article className='futureTurn'>
                    <h4> התור העתידי שנקבע לך הוא :   </h4>
                    <table>
                        <thead>
                            <tr>
                                <td>תאריך</td>
                                <td>שעה</td>
                                <td>ספר</td>
                            </tr>
                        </thead>

                        <tbody>

                            {futurTurn ?
                                <tr>
                                    <td>{moment(futurTurn.date).format("DD-MM-YYYY")}</td>
                                    <td>{futurTurn.time}</td>
                                    <td>{futurTurn.barber}</td>
                                </tr>
                                :
                                <tr>
                                    <td>DD-MM-YYYY</td>
                                    <td>--:--</td>
                                    <td>----</td>
                                </tr>
                                
                            }



                        </tbody>
                    </table>

                    <p>מצפים לראותך
                        <br />
                    צוות {businessName} </p>
                    <p>ניתן לבטל או לעדכן תור עד <b>שעתיים לפני התור</b></p>
                    {/* <button onClick={updateTurn}>עדכון</button>
                    <button onClick={deleteTurn}>מחיקה</button> */}
                    <UpdateMetting />
                    <DeleteMetting />
                </article>

            </section>
        </>
    )
}

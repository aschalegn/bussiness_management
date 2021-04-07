import React, { useState } from 'react'
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export default function ContactUs() {
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [sent, setSent] = useState(false);

    const formSubmit = () => {
        const data = {
            fullName: fullName,
            phone: phone,
            email: email,
        }
        console.log(data);
        axios.post('/api/forma', data)
            .then(res => {
                if (res.status === 200) {
                    setSent(true);
                    console.log(res);
                }
                else {
                    console.log(`error code ${res.status}`)
                }
            })
            .catch((err) => {
                console.log(err.message);

            })
    }
    return (
        <div>
            <form id="contact" data-aos='fade-in'>
                <div>
                    <TextField id="standard-basic" label="שם מלא" type='text' onChange={(e) => { setFullName(e.target.value) }} />
                    <TextField id="standard-basic" label="טלפון" type='text' onChange={(e) => { setPhone(e.target.value) }} />
                    <TextField id="standard-basic" label="מייל" type='email' onChange={(e) => { setEmail(e.target.value) }} />
                </div>

                <div className='btnFotterSubmit'>
                    <Button type='button' variant="outlined" color="primary" onClick={formSubmit}> שלח </Button>
                </div>
            </form>
            <div className='copyrights'><p>כל הזכויות שמורים 2021 Tor2U</p>  </div>
        </div>
    )
}

import axios from 'axios';
import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import { userContext } from '../../../context/User';
import { baseURL } from '../../../utils';
import "./AdminNav.css";
type Props = {
    location?: string
}

export default function AdminNav({ location }: Props) {
    const { user, signOut } = useContext(userContext);
    return (
        <header className='adminHeader'>
            {location === "home" ?
                <>
                    <h3>{user.name}</h3>
                    <button onClick={signOut}>יציאה</button>
                </>
                :
                <>
                    <Link to="/6028e4f2ed8a283230f4bc6c">Back Button</Link>
                    <h3>{location}</h3>
                </>
            }
            <img src="../logo.jpg" alt="logo" />
        </header>
    )
}

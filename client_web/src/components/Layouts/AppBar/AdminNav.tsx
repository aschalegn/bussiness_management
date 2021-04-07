import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import { userContext } from '../../../context/User';
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
                    <div className='homeAccount'>
                        <button onClick={signOut} className="exitAccount">יציאה</button>
                    </div>
                    <div>
                        <h3>{user.name}</h3>
                    </div>
                </>
                :
                <>
                    <div>
                        <button className="exitAccount">
                            <Link to="/6028e4f2ed8a283230f4bc6c">Back Button</Link>
                        </button>
                    </div>
                    <div>
                        <h3>{location}</h3>
                    </div>
                </>
            }
            <img src="../logo.jpg" alt="logo" />
        </header>
    )
}

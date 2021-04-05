import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, } from '@material-ui/core';
import { HashLink } from "react-router-hash-link"
import { Link } from 'react-router-dom';


export default function TopNavbar() {
    const [navbar, setNavbar] = useState(false);

    const changeNavBG = () => {
        if (window.scrollY >= 350) {
            setNavbar(true);
        } else {
            setNavbar(false);
        }
    }
    window.addEventListener('scroll', changeNavBG)
    return (
        <AppBar className={navbar ? 'MuiAppBar-colorPrimary active' : 'MuiAppBar-colorPrimary'}>
            <Toolbar>
                <Typography>

                </Typography>
                <nav className={navbar ? 'navbar active' : 'navbar'}>
                    <ul>
                        <li>
                            <Link to="">אודות</Link>
                        </li>
                        <li>
                            <HashLink to="/#commonQA">שאלות נפוצות</HashLink>
                        </li>
                        <li>
                            <Link to="/admin/register">הרשם עכשיו</Link></li>
                        <li>
                            <Link to="/admin/login">כניסה למערכת</Link>
                        </li>
                    </ul>
                </nav>
            </Toolbar>
        </AppBar>
    )
}

import React, { useContext } from 'react';
import { Link } from 'react-router-dom'
import { userContext } from '../../../context/User';
import AdminNav from '../../Layouts/AppBar/AdminNav';
import './adminHome.css';
import SettingsIcon from '@material-ui/icons/Settings';
const Home = () => {
    const { user } = useContext(userContext)
    return (
        <>
            <AdminNav location={"home"} />
            <main className="admin">
                <div className="grid-container">
                    <div className="grid-item">
                        <Link to="/6028e4f2ed8a283230f4bc6c/live">
                            תורים עכשיו
                        </Link>
                    </div>
                    <div className="grid-item">
                        <Link to="/6028e4f2ed8a283230f4bc6c/appointments">
                            תורים
                        </Link>
                    </div>
                    <div className="grid-item">
                        <Link to="">
                            קביעת תורים
                        </Link>
                    </div>
                    <div className="grid-item">
                        <SettingsIcon />
                        <Link to="/6028e4f2ed8a283230f4bc6c/settings">
                            הגדרות
                        </Link>
                    </div>
                    <div className="grid-item">
                        <Link to="">
                            סיכום חודשי
                        </Link>
                    </div>
                    <div className="grid-item">
                        <Link to="/6028e4f2ed8a283230f4bc6c/addWorkers">
                            הוספת עובדים
                        </Link>
                    </div>
                    <div className="grid-item">
                        <Link to="">
                            טקרנימח
                        </Link>
                    </div>
                    <div className="grid-item">
                        <Link to="">
                            רשתות חברתיות
                        </Link>
                    </div>
                    <div className="grid-item">
                        <Link to="">
                            הגדרות
                        </Link>
                    </div>
                </div>
            </main>
        </>
    );
}

export default Home;
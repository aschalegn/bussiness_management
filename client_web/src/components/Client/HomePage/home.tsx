import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './clientHome.css';
import { userContext } from '../../../context/User';
import { Button } from '@material-ui/core';
import DateRangeIcon from '@material-ui/icons/DateRange';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';

const Home = () => {
    const { signOut, user } = useContext(userContext)

    return (
        <>
            <header className='clientHome'>
                <button className='exitAccount' onClick={signOut}>יציאה</button>
                <img src="https://media.istockphoto.com/photos/everything-should-be-perfect-picture-id522305300?b=1&k=6&m=522305300&s=170667a&w=0&h=s6xDPtJSyFXOhqH9K0K7XLM1_Z3xah8YZD5ND6YOOO8=" id="businessPhoto" alt="businessPhoto" />
                <img src="./logo.jpg" id="businessLogo" alt="logo" />
            </header >
            <main className="client">
                <section className="grid-container">
                    <div className="grid-item">
                        <Link to='/6028e4f2ed8a283230f4bc6c/appointment'>
                            <Button variant="outlined" color="primary">
                                <DateRangeIcon /><br/>
                                 קביעת תורים</Button>
                        </Link>
                    </div>
                    {/* <div className="grid-item">
                        <AllAppointmentByClient />
                    </div> */}

                    <div className="grid-item">
                        <Link to={`${user.businesses[0]._id}/FutureAppointment`}>
                            <EventAvailableIcon /><br/>
                            תורים עתידיים</Link>
                    </div>

                    <div className="grid-item">
                        <img src="icons/waze.png" alt="waze icon" />
                        <p>  נווט לעסק</p>
                    </div>


                    <div className="grid-item">
                    </div>

                    <div className="grid-item">

                    </div>
                </section>
            </main>
            <footer>
                רוצה גם ?<Link to=""> www.nkgnkgnr.com</Link>
            </footer>
        </>
    )
}
export default Home
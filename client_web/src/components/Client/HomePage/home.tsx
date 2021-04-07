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
            <header className='homeAccount'>
                <button className='exitAccount' onClick={signOut}>יציאה</button>
                <img src="https://media.istockphoto.com/photos/everything-should-be-perfect-picture-id522305300?b=1&k=6&m=522305300&s=170667a&w=0&h=s6xDPtJSyFXOhqH9K0K7XLM1_Z3xah8YZD5ND6YOOO8=" id="businessPhoto" alt="businessPhoto" />
                <img src="./logo.jpg" id="businessLogo" alt="logo" />
            </header >
            <main className="client">
                <section className="grid-container">
                    <article className="grid-item">
                        <Link to='/6028e4f2ed8a283230f4bc6c/appointment'>
                            <Button variant="outlined" color="primary">
                                <DateRangeIcon className="icon" />
                                <h5>קביעת תורים</h5>
                            </Button>
                        </Link>
                    </article>

                    <article className="grid-item">
                        <Link to={`${user.businesses[0]._id}/FutureAppointment`}>
                            <Button variant="outlined" color="primary">
                                <EventAvailableIcon className="icon" />
                                <h5>
                                    תור עתידי
                               </h5> </Button>
                        </Link>
                    </article>

                    <article className="grid-item">
                        <a href=""> 
                            <Button variant="outlined" color="primary">
                                <img src="icons/waze.png" alt="waze icon" className="icon" />
                                <h5>  נווט לעסק</h5>
                            </Button>
                        </a>
                    </article>

                    <article className="grid-item">
                        <Link to="">
                            <Button variant="outlined" color="primary">
                                <h5>facebook</h5>
                            </Button>
                        </Link>
                    </article>

                    <article className="grid-item">
                        <Link to="">
                            <Button variant="outlined" color="primary">
                                <h5>Instagram</h5>
                            </Button>
                        </Link>
                    </article>

                    <article className="grid-item">
                        <Link to="">
                            <Button variant="outlined" color="primary">
                                <h5>whatsApp</h5>
                            </Button>
                        </Link>
                    </article>

                </section>
            </main>
            <footer>
                רוצה גם ?<Link to=""> www.nkgnkgnr.com</Link>
            </footer>
        </>
    )
}
export default Home
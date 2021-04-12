import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './clientHome.css';
import { userContext } from '../../../context/User';
import { Button } from '@material-ui/core';
import DateRangeIcon from '@material-ui/icons/DateRange';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';

const Home = () => {
    const { signOut, user } = useContext(userContext);

    return (
        <>
            <header className='homeAccount'>
                <button className='exitAccount' onClick={signOut}>יציאה</button>
                <img src="https://media.istockphoto.com/photos/everything-should-be-perfect-picture-id522305300?b=1&k=6&m=522305300&s=170667a&w=0&h=s6xDPtJSyFXOhqH9K0K7XLM1_Z3xah8YZD5ND6YOOO8=" id="businessPhoto" alt="businessPhoto" />
                <img src="./logo.jpg" id="businessLogo" alt="logo" />
            </header>
            <main className="client">
                <section className="grid-container">
                    <article className="grid-item">
                        <Link to='/6028e4f2ed8a283230f4bc6c/appointment'>
                            <Button variant="outlined" color="primary">
                                <DateRangeIcon className="icon" />
                                <h6>קביעת תורים</h6>
                            </Button>
                        </Link>
                    </article>

                    <article className="grid-item">
                        <Link to={`${user.businesses[0]._id}/FutureAppointment`}>
                            <Button variant="outlined" color="primary">
                                <EventAvailableIcon className="icon" />
                                <h6>
                                    תור עתידי
                               </h6> </Button>
                        </Link>
                    </article>

                    <article className="grid-item">
                        <a href="">
                            <Button variant="outlined" color="primary">
                                <img src="icons/waze.png" alt="waze icon" className="icon" />
                                <h6>  נווט לעסק</h6>
                            </Button>
                        </a>
                    </article>

                    {user.businesses[0].socialMedia.map((social, i) => {
                        return (
                            <article className="grid-item">
                                {
                                    <a href={`${social.name === "whatsApp" ? "https://wa.me/927" + social.link : social.link}`}>
                                        <Button variant="outlined" color="primary">
                                            {social.name === "instagram" ?
                                                <InstagramIcon />
                                                : social.name === "facebook" ?
                                                <FacebookIcon />
                                                :
                                                <WhatsAppIcon />
                                            }
                                            <h6>{social.name}</h6>
                                        </Button>
                                    </a>
                                }
                            </article>
                        )
                    })}

                </section>
            </main>
            <footer>
                רוצה גם ?<a href="https://www.tor2u.com">https://www.tor2u.com</a>
            </footer>
        </>
    )
}
export default Home
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './clientHome.css';
import { userContext } from '../../../context/User';


import MakeAppointment from "../AfterLogin/MakeAppointment";
import AllAppointmentByClient from "../AfterLogin/AllAppointment";
import FutureAppointment from "../AfterLogin/FutureAppointment";



const Home = () => {
    const { signOut } = useContext(userContext)

 
    return (
        <>
            <header>
                <button onClick={signOut}>יציאה</button>
                <img src="https://media.istockphoto.com/photos/everything-should-be-perfect-picture-id522305300?b=1&k=6&m=522305300&s=170667a&w=0&h=s6xDPtJSyFXOhqH9K0K7XLM1_Z3xah8YZD5ND6YOOO8=" id="businessPhoto" alt="businessPhoto" />
                <img src="./logo.jpg" id="businessLogo" alt="logo" />
            </header>
            <main className="client">
                <section className="grid-container">
                    <div className="grid-item">
                        <MakeAppointment />
                    </div>


                    <div className="grid-item">
                        <AllAppointmentByClient />
                    </div>

                    <div className="grid-item">
                        <FutureAppointment />
                    </div>

                    <div className="grid-item">
                        <MakeAppointment />
                    </div>

                    <div className="grid-item">
                        <MakeAppointment />
                    </div>

                    <div className="grid-item">
                        <MakeAppointment />
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
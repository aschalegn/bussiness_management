import React, { useState, useEffect } from 'react';
import './tor2U.css';
import { useMediaQuery, useTheme, makeStyles, Button } from '@material-ui/core';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { HashLink } from "react-router-hash-link"
import { Link } from 'react-router-dom';
import CommonQA from './CommonQA';
import LeftSideNavbar from './leftNavbar';
import TopNavbar from './topNavbar';
import Aos from 'aos';
import 'aos/dist/aos.css';
import ContactUs from './contactUs';
const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const tutorialSteps = [
    {
        label: 'San Francisco – Oakland Bay Bridge, United States',
        imgPath:
            'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
    },
    {
        label: 'Bird',
        imgPath:
            'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60',
    },
    {
        label: 'Bali, Indonesia',
        imgPath:
            'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250&q=80',
    },
    {
        label: 'NeONBRAND Digital Marketing, Las Vegas, United States',
        imgPath:
            'https://images.unsplash.com/photo-1518732714860-b62714ce0c59?auto=format&fit=crop&w=400&h=250&q=60',
    },
    {
        label: 'Goč, Serbia',
        imgPath:
            'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60',
    },
];

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 400,
        flexGrow: 1,
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        height: 50,
        paddingLeft: theme.spacing(4),
        backgroundColor: theme.palette.background.default,
    },
    img: {
        display: 'block',
        maxWidth: 400,
        overflow: 'hidden',
        width: '100%',
    },
}));

const Home = () => {
    const corousaleClasses = useStyles();
    const theme = useTheme();
    const [activeStep, setActiveStep] = useState(0);


    useEffect(() => {
        Aos.init({ duration: 1200 });
    }, [])

    const handleStepChange = (step: number) => {
        setActiveStep(step);
    };
    //BreakPoints
    const isMatch = useMediaQuery(theme.breakpoints.down('md'));



    return (
        <div className='tor2U'>
            <header className='mainHeader'>
                {isMatch ? (<LeftSideNavbar />) : (<TopNavbar />)}
                <div className={`${corousaleClasses.root} tor2u_corousale`}>
                    <AutoPlaySwipeableViews
                        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                        index={activeStep}
                        onChangeIndex={handleStepChange}
                        enableMouseEvents
                    >
                        {tutorialSteps.map((step, index) => (
                            <div key={step.label} className='caruselaImg'>
                                {Math.abs(activeStep - index) <= 2 ? (
                                    <img className={corousaleClasses.img} src={step.imgPath} alt={step.label} />
                                ) : null}
                            </div>
                        ))}
                    </AutoPlaySwipeableViews>
                </div>
                <div className='mainTextHeader'>
                    <h1>מערכת לניהול תורים</h1>
                    <h4>קליק אחד והתור נקבע</h4>
                    <div className='btnMainHeader'>
                        <Button variant="outlined" color="primary" >
                            <HashLink to="/#contact"> צור קשר </HashLink>
                        </Button>
                        <Button variant="outlined" color="primary">
                            <Link to="/admin/login"> התחברות</Link>
                        </Button>
                    </div>
                </div>
            </header>
            <main className='aboutUs'>
                <header data-aos='fade-up'> <h1 className='weServices'>אודותינו</h1> </header>
                <section className='about'>
                    <article data-aos='fade-up'>
                        <p >
                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                             Et similique blanditiis, dolorem expedita repudiandae consequatur,
                              a nam, illo quia ipsa necessitatibus vitae. Saepe aut eius quo, 
                              unde architecto maiores velit.
                              Lorem ipsum dolor sit amet consectetur adipisicing elit.
                             Et similique blanditiis, dolorem expedita repudiandae consequatur,
                              a nam, illo quia ipsa necessitatibus vitae. Saepe aut eius quo, 
                              unde architecto maiores velit.
                              Lorem ipsum dolor sit amet consectetur adipisicing elit.
                             Et similique blanditiis, dolorem expedita repudiandae consequatur,
                              a nam, illo quia ipsa necessitatibus vitae. Saepe aut eius quo, 
                              unde architecto maiores velit.
                              Lorem ipsum dolor sit amet consectetur adipisicing elit.
                             Et similique blanditiis, dolorem expedita repudiandae consequatur,
                              a nam, illo quia ipsa necessitatibus vitae. Saepe aut eius quo, 
                              unde architecto maiores velit.
                              Lorem ipsum dolor sit amet consectetur adipisicing elit.
                             Et similique blanditiis, dolorem expedita repudiandae consequatur,
                              a nam, illo quia ipsa necessitatibus vitae. Saepe aut eius quo, 
                              unde architecto maiores velit.
                              Lorem ipsum dolor sit amet consectetur adipisicing elit.
                             Et similique blanditiis, dolorem expedita repudiandae consequatur,
                              a nam, illo quia ipsa necessitatibus vitae. Saepe aut eius quo, 
                              unde architecto maiores velit.
                        </p>
                    </article>
                </section>
            </main>
            <main className="services">
                <header data-aos='fade-up'> <h1 className='weServices'>השירותים שלנו</h1> </header>
                <section className='servicesType'>
                    <article data-aos='fade-up'>
                        <img src="icons/undraw_message_sent_1030.svg" alt="sms" />
                        <p>שליחת הודעות</p>
                    </article>
                    <article data-aos='fade-up'>
                        <img src="icons/undraw_Mobile_application_mr4r.svg" alt="app" />
                        <p>אפליקציה לסמארטפון</p>
                    </article>
                    <article data-aos='fade-up'>
                        <img src="icons/undraw_Booking_re_gw4j.svg" alt="sms" />
                        <p>מערכת לקביעת תורים</p>
                    </article>
                    <article data-aos='fade-up'>
                        <img src="icons/undraw_Connecting_Teams_8ntu.svg" alt="sms" />
                        <p>מערכת לניהול לקוחות</p>
                    </article>
                    <article data-aos='fade-up'>
                        <img src="icons/wallet.svg" alt="sms" />
                        <p>תשלומים</p>
                    </article>
                    <article data-aos='fade-up'>
                        <img src="icons/undraw_message_sent_1030.svg" alt="sms" />
                        <p>שליחת הודעות</p>
                    </article>
                </section>

                <section data-aos='fade-up' className="commonQA" id="commonQA">
                    <CommonQA />
                </section>
            </main>

            <footer>
                <ContactUs/>
            </footer>
        </div>
    )
}
export default Home
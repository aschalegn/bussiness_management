import React from 'react';
import './tor2U.css';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import TextField from '@material-ui/core/TextField';
import SmsIcon from '@material-ui/icons/Sms';
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
        // height: 255,
        display: 'block',
        maxWidth: 400,
        overflow: 'hidden',
        width: '100%',
    },
}));

const Home = () => {
    const classes = useStyles();
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);

    const handleStepChange = (step: number) => {
        setActiveStep(step);
    };
    return (
        <div className='tou2U'>
            <header className='mainHeader'>
                <nav className='navbar'>
                    <ul>
                        <li>אודות</li>
                        <li>שאלות נפוצות</li>
                        <li>הרשם עכשיו</li>
                        <li>כניסה למערכת</li>
                    </ul>
                </nav>

                <div className={classes.root}>
                    <AutoPlaySwipeableViews
                        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                        index={activeStep}
                        onChangeIndex={handleStepChange}
                        enableMouseEvents
                    >
                        {tutorialSteps.map((step, index) => (
                            <div key={step.label} className='caruselaImg'>
                                {Math.abs(activeStep - index) <= 2 ? (
                                    <img className={classes.img} src={step.imgPath} alt={step.label} />
                                ) : null}
                            </div>
                        ))}
                    </AutoPlaySwipeableViews>
                </div>
                <div className='mainTextHeader'>
                    <h1>מערכת לניהול תורים</h1>
                    <h4>קליק אחד והתור נקבע</h4>
                    <div className='btnMainHeader'>
                        <Button variant="outlined" color="primary" >  צור קשר </Button>
                        <Button variant="outlined" color="primary">    התחברות </Button>
                    </div>
                </div>
            </header>

            <main>
                <section className='services'>
                    <article>
                        <img src="icons/undraw_message_sent_1030.svg" alt="sms"/>
                        <p>שליחת הודעות</p>
                    </article>
                    <article>
                        <img src="icons/undraw_Mobile_application_mr4r.svg" alt="app"/>
                        <p>אפליקציה לסמארטפון</p>
                    </article>
                    <article>
                        <img src="icons/undraw_Booking_re_gw4j.svg" alt="sms"/>
                        <p>מערכת לקביעת תורים</p>
                    </article>
                    <article>
                        <img src="icons/undraw_Connecting_Teams_8ntu.svg" alt="sms"/>
                        <p>מערכת לניהול לקוחות</p>
                    </article>
                    <article>
                        <img src="icons/undraw_Connecting_Teams_8ntu.svg" alt="sms"/>
                        <p>תשלומים</p>
                    </article>
                    <article>
                        <img src="icons/undraw_message_sent_1030.svg" alt="sms"/>
                        <p>שליחת הודעות</p>
                    </article>
                </section>
                <section></section>
                <section></section>
            </main>

            <footer>
                <form action="">
                    <div>
                        <TextField id="standard-basic" label="שם מלא" type='text' />
                        <TextField id="standard-basic" label="טלפון" type='text' />
                        <TextField id="standard-basic" label="מייל" type='email' />
                    </div>

                    <div className='btnFotterSubmit'>
                        <Button type='submit' variant="outlined" color="primary" > שלח </Button>
                    </div>
                </form>
                <div className='copyrights'><p>כל הזכויות שמורים 2021 Tor2U</p>  </div>
            </footer>
        </div>
    )
}
export default Home
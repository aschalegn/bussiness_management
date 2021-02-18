import React, { useContext, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import { List, Divider, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { userContext } from '../../../context/User';
import HomeClient from '../../Client/HomePage/home';
import HomeAdmin from '../../Admin/AfterLogin';
import LogIn from '../../Admin/Login';
import Register from '../../Admin/Register';
import SignIn from '../../Client/Login';
import SignUp from '../../Client/Register';
import Home from '../../AppointU';
import MakeAppointment from '../../Client/AfterLogin/MakeAppointment';
import FutureAppointment from '../../Client/AfterLogin/FutureAppointment';
import AddWorkers from '../../Admin/AfterLogin/Workers/AddWorkers';
import WorkersHome from '../../Admin/AfterLogin/Workers/index';
import ForgoPassword from '../../Admin/AfterLogin/forgoPassword/';
import Reset from '../../Admin/AfterLogin/forgoPassword/Reset';
import Admin from '../Admin';
import Worker from '../Worker';
import Appointments from '../../Admin/AfterLogin/Appointments/index';
import AppointmentsProvider from '../../../context/Appointments';
import Live from '../../Admin/AfterLogin/Appointments/Live';
import Main from '../../Admin/AfterLogin/Setting';
type Anchor = 'right';

export default function Navbar() {
    const [state, setState] = React.useState({ right: false });
    const { user } = useContext(userContext);
    const toggleDrawer = (anchor: Anchor, open: boolean) => (
        event: React.KeyboardEvent | React.MouseEvent,
    ) => {
        if (event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' ||
                (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }
        setState({ ...state, [anchor]: open });
    };

    const list = (anchor: Anchor) => (
        <div
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >

            <List>
                <ListItem button>
                    <ListItemIcon>logo</ListItemIcon>
                    <ListItemText primary={'AppointU'} />
                </ListItem>

            </List>
            <Divider />
            <List>
                <ListItem button>
                    <ListItemIcon></ListItemIcon>
                    <ListItemText />
                </ListItem>
                <ListItem>
                    <ListItemText>
                        <Link to='/'>דף בית</Link>
                    </ListItemText>
                </ListItem>
                <ListItem>
                    <ListItemText>
                        <Link to='/signin'>כניסה</Link>
                    </ListItemText>
                </ListItem>
                <ListItem>
                    <ListItemText>
                        <Link to='/signup'>הרשמה</Link>
                    </ListItemText>
                </ListItem>
                <ListItem>
                    <ListItemText>
                        <Link to='/admin/login'>כניסת מנהלים</Link>
                    </ListItemText>
                </ListItem>
                <ListItem>
                    <ListItemText>
                        <Link to='admin/register'>הרשמת מנהלים</Link>
                    </ListItemText>
                </ListItem>
            </List>
        </div>

    );

    return (
        <div>
            <Router>
                <Switch>
                    {!user ?
                        <>
                            <Route exact path='/' component={Home} />
                            <Route exact path='/signin' component={SignIn} />
                            <Route exact path='/signup' component={SignUp} />
                            <Route exact path='/admin/login' component={LogIn} />
                            <Route exact path='/admin/register' component={Register} />
                            <Route exact path='/admin/forgotpassword' component={ForgoPassword} />
                            <Route exact path='/admin/forgotpassword/:random' component={Reset} />
                        </>
                        :
                        user.type === 'client' ?
                            <AppointmentsProvider>
                                <Fragment>
                                    <Route exact path='/6028e4f2ed8a283230f4bc6c' component={HomeClient} />
                                    <Route exact path='/6028e4f2ed8a283230f4bc6c/makeappointment' component={MakeAppointment} />
                                    <Route exact path='/6028e4f2ed8a283230f4bc6c/FutureAppointment' component={FutureAppointment} />
                                </Fragment>
                            </AppointmentsProvider>
                            : user.type === 'business' ?
                                <>
                                    {user.role === 'worker' ?
                                        <Worker>
                                            
                                        </Worker>
                                        :
                                        <AppointmentsProvider>
                                            <Admin>
                                                <Route exact path='/:bussinesId' component={HomeAdmin} />
                                                <Route exact path='/6028e4f2ed8a283230f4bc6c/settings' component={Main} />
                                                <Route exact path='/:bussinesId/addWorkers' component={AddWorkers} />
                                                <Route exact path='/:bussinesId/workers' component={WorkersHome} />
                                                <Route exact path='/:bussinesId/appointments' component={Appointments} />
                                                <Route exact path='/:bussinesId/live' component={Live} />
                                            </Admin>
                                        </AppointmentsProvider>
                                    }
                                </>
                                :
                                <>
                                    hgvghv
                                    <h1>404 page</h1>
                                </>
                    }
                </Switch>
            </Router>
        </div>

    );
}

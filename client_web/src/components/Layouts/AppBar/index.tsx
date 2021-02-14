import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

import { createStyles, AppBar, Toolbar, IconButton, Theme, makeStyles, Drawer, Button, List, Divider, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { userContext } from '../../../context/User';
import HomeClient from '../../Client/HomePage/home';
import HomeAdmin from '../../Admin/AfterLogin';
import LogIn from '../../Admin/Login';
import Register from '../../Admin/Register';
import SignIn from '../../Client/Login';
import SignUp from '../../Client/Register';
import Home from '../../AppointU';
import MakeAppointment from '../../Client/AfterLogin/MakeAppointment';
import AddWorkers from '../../Layouts/Admin/Setting/AddWorkers';
import AllAppointmentByClient from '../../Client/AfterLogin/AllAppointment';
import ForgoPassword from '../../Admin/AfterLogin/forgoPassword/';
import Reset from '../../Admin/AfterLogin/forgoPassword/Reset';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
    }),
);
type Anchor = 'right';

export default function Navbar() {
    const classes = useStyles();
    const [state, setState] = React.useState({ right: false });
    const { user, signOut } = useContext(userContext);
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

    const listAdmin = (anchor: Anchor) => (
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
                        <Link to='/addworkers'>הוספת עובדים</Link>
                    </ListItemText>
                </ListItem>
                <ListItem>
                    <ListItemText>
                        <Button onClick={signOut}>SIGN_OUT</Button>
                    </ListItemText>
                </ListItem>
            </List>
        </div>

    );
    const listClient = (anchor: Anchor) => (
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
                        <Link to='/makeappointment'>קביעת תורים</Link>
                    </ListItemText>
                </ListItem>
                <ListItem>
                    <ListItemText>
                        <Button onClick={signOut}>SIGN_OUT</Button>
                    </ListItemText>
                </ListItem>
            </List>
        </div>

    );
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
                        <Link to='/admin/signup'>הרשמה</Link>
                    </ListItemText>
                </ListItem>
                <ListItem>
                    <ListItemText>
                        <Link to='/admin/login'>כניסת מנהלים</Link>
                    </ListItemText>
                </ListItem>
                <ListItem>
                    <ListItemText>
                        <Link to='/register'>הרשמת מנהלים</Link>
                    </ListItemText>
                </ListItem>
            </List>
        </div>

    );

    useEffect(() => {
        console.log(!user);
    }, []);

    return (
        <div>
            <Router>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" >

                            {(['right'] as Anchor[]).map((anchor) => (
                                <React.Fragment key={anchor}>
                                    <Button onClick={toggleDrawer(anchor, true)}><MenuIcon /></Button>
                                    <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
                                        {!user ?
                                            list(anchor)
                                            : user.type === 'client' ? listClient(anchor)
                                                : listAdmin(anchor)
                                        }
                                    </Drawer>
                                </React.Fragment>
                            ))}
                        </IconButton>
                    </Toolbar>
                </AppBar>

                <Switch>
                    {!user ?
                        <>
                            <Route exact path='/' component={Home} />
                            <Route exact path='/signin' component={SignIn} />
                            <Route exact path='/signup' component={SignUp} />
                            <Route exact path='/admin/login' component={LogIn} />
                            <Route exact path='/admin/signup' component={Register} />
                            <Route exact path='/admin/forgotpassword' component={ForgoPassword} />
                            <Route exact path='/admin/forgotpassword/:random' component={Reset} />

                        </>
                        :

                        user.type === 'client' ?
                            <>
                                <Route exact path='/' component={HomeClient} />
                                <Route exact path='/makeappointment' component={MakeAppointment} />
                                <Route exact path='/allappointmentbyclient' component={AllAppointmentByClient}/>

                            </>
                            :
                            <>
                                <Route exact path='/' component={HomeAdmin} />
                                <Route exact path='/addWorkers' component={AddWorkers} />
                            </>
                    }
                </Switch>
            </Router>
        </div>

    );
}

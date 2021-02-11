import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { createStyles, AppBar, Toolbar, IconButton, Theme, makeStyles, Drawer, Button, List, Divider, ListItem, ListItemIcon, ListItemText, Link } from '@material-ui/core';
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
    const { user } = useContext(userContext);
    const toggleDrawer = (anchor: Anchor, open: boolean) => (
        event: React.KeyboardEvent | React.MouseEvent,
    ) => {
        if (
            event.type === 'keydown' &&
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
                        <Link>admin home</Link>
                    </ListItemText>
                </ListItem>
                <ListItem>
                    <ListItemText>
                        <Link>setting</Link>
                    </ListItemText>
                </ListItem>
                <ListItem>
                    <ListItemText>
                        <Link>SIGN_OUT</Link>
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
                        <Link>client home</Link>
                    </ListItemText>
                </ListItem>
                <ListItem>
                    <ListItemText>
                        <Link>setting</Link>
                    </ListItemText>
                </ListItem>
                <ListItem>
                    <ListItemText>
                        <Link>SIGN_OUT</Link>
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
                        <Link>home</Link>
                    </ListItemText>
                </ListItem>
                <ListItem>
                    <ListItemText>
                        <Link>setting</Link>
                    </ListItemText>
                </ListItem>
                <ListItem>
                    <ListItemText>
                        <Link>SIGN_OUT</Link>
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
            <Router>
                <Switch>
                    {!user ?
                        <>
                            <Route exact path='/' component={Home} />
                            <Route exact path='/signIn' component={SignIn} />
                            <Route exact path='/signUp' component={SignUp} />
                            <Route exact path='/admin/login' component={LogIn} />
                            <Route exact path='/admin/signUp' component={Register} /> 
                            <Route exact path='/client/makeAppointment' component={MakeAppointment} />
                        </>
                        :

                        user.type === 'client' ?
                            <>
                                    <Route exact path='/' component={HomeClient} />
                               
                            </>
                            :
                            <Route exact path='/' component={HomeAdmin} />
                    }
                </Switch>
            </Router>
        </div>

    );
}

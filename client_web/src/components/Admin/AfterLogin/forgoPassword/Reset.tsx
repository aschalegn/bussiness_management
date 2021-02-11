import React, { useState, FormEvent } from 'react';
import { Link } from "react-router-dom";
import {
    Container, Avatar, Typography,
    TextField, Grid, Button, makeStyles
} from "@material-ui/core";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import axios from 'axios';
import { baseURL } from '../../../../utils';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function Reset() {
    const classes = useStyles();
    const [email, setEmail] = useState("");
    const [sent, setSent] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const sendEmail = (e: FormEvent) => {
        e.preventDefault();
        if (password === confirmPassword) { };
        axios.patch(`${baseURL}business/updatePassword`, { email, password })
            .then(res => {
                if (res.status === 200) {
                    setSent(true);
                }
            });
    }

    return (
        <Container component="main" maxWidth="xs">
            {sent ? <div>העדכון בוצע בהצלחה
                <Link to="/admin/login">מעבר לדף ההתחברות</Link>
            </div> :
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        שכחת סיסמה? הכנס מייל
        </Typography>
                    <form className={classes.form} onSubmit={sendEmail}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="אי-מייל"
                            name="email"
                            autoComplete="off"
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                            autoFocus
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="password"
                            type="password"
                            label="סיסמה"
                            name="password"
                            autoComplete="off"
                            onChange={(e) => setPassword(e.target.value)}
                            autoFocus
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="password"
                            type="password"
                            label="אמת סיסמה"
                            name="confirmPassword"
                            autoComplete="off"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            autoFocus
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            שלח לי מייל אימות
                        </Button>
                        <Grid container justify="center">
                            <Grid item >
                                <Link to='/admin/login' >
                                    {"חזור לדף כניסה"}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            }
        </Container>
    )
}

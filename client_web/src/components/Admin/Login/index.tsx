import React, { useState, useContext } from 'react';
import { Redirect, Link } from 'react-router-dom';
import {
  Avatar, Button, CssBaseline, TextField,
  Grid, Typography, Container
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import { userContext } from '../../../context/User';

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

export default function LogIn() {
  const classes = useStyles();
  const { user, signIn } = useContext(userContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState('');
  const handleSignIn = () => {
    signIn(email, password);
  }

  return (
    <Container component="main" maxWidth="sm">
      {user ?
        <Redirect to="/6028e4f2ed8a283230f4bc6c" />
        : ''
      }
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          כניסה לחשבון
        </Typography>
        <form className={classes.form}>
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
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => handleSignIn()}
          >
            כנס
          </Button>
          <Grid container justify="center">
            <Grid item xs>
              <Link to='/admin/forgotpassword' >
                שכחת סיסמה?
              </Link>
            </Grid>
            <Grid item >
              <Link to='/admin/signUp' >
                {"עדיין אין לך חשבון? הרשם"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
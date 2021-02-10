import React, { useState, FormEvent, useContext, ContextType } from 'react';
import {
  Avatar, Button, CssBaseline,
  TextField, Link, Typography, makeStyles, Container, Box
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import axios from 'axios';
import { baseURL } from '../../../utils';
// import { userContext } from "../../../context/User";
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        AppointU 2021
        </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  // const {  } = useContext(userContext) as ContextType;
  paper: {
    marginTop: theme.spacing(2),
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
  input: {
    "&:invalid": {
      border: "red solid 2px"
    }
  }
}));

const Register = () => {
  const classes = useStyles();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const body = { name, phone, email, password }
    axios.post(`${baseURL}business`, body)
      .then(res => {
        if (res.status === 201) {
          console.log(res.data);
          // userDispatch({ type: "SIGN_UP", payload: res.data });
        }
      }).catch((err) => {
        console.log(err, 'some erorr')
      })
  }

  return (
    <div>

      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            הרשמה
            </Typography>
          <form onSubmit={handleSubmit} className={classes.form}>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="name"
              label="שם העסק"
              name="name"
              autoComplete="off"
              autoFocus
              onChange={(e) => setName(e.target.value)}
              required
            />

            <TextField
              variant="outlined"
              margin="normal"
              inputProps={{ pattern: "[0-9]{10}" }}
              fullWidth
              id="phone"
              label="מספר טלפון"
              name="phone"
              type="phone"
              autoComplete="off"
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              type="email"
              id="email"
              label="אי-מייל"
              name="email"
              autoComplete="off"
              autoFocus
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              type="password"
              id="password"
              label="סיסמה"
              name="password"
              autoComplete="off"
              autoFocus
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              הרשמה
              </Button>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </div>
  );
}

export default Register;
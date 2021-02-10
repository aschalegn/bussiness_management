import React, { useState, useContext, FormEvent } from 'react';
import { useForm } from 'react-hook-form';
import { Redirect } from 'react-router-dom';
import { userContext } from '../../../context/User';
import {
  Avatar, Button, CssBaseline,
  TextField, FormControlLabel,
  Checkbox, Link, Typography, makeStyles, Container, Box
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
        </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

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
  input: {
    "&:invalid": {
      border: "red solid 2px"
    }
  }
}));

const SignUp = () => {
  const classes = useStyles();
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const { user, signUpClient } = useContext(userContext);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    signUpClient(fullName, phone)
  }

  return (
    <div>
      {user ?
        <Redirect to='/Home' />
        : ''
      }
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
            </Typography>
          <form onSubmit={onSubmit} className={classes.form}>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="fullName"
              label="Full Name"
              name="fullName"
              autoComplete="off"
              autoFocus
              onChange={(e) => setFullName(e.target.value)}
              required
            />

            <TextField
              variant="outlined"
              margin="normal"
              inputProps={{ pattern: "[0-9]{10}" }}
              fullWidth
              id="phone"
              label="Phone Number"
              name="phone"
              type="number"
              autoComplete="off"
              onChange={(e) => setPhone(e.target.value)}
              required
            />

            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
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

export default SignUp;
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { baseURL } from '../../../utils';

import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

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
  const { register, handleSubmit } = useForm();
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');

  const onSubmit = () => {
    console.log(fullName, phone);

    axios.post(`${baseURL}client/signUp`, {
      fullName,
      phone
    })
      .then(res => {
        if (res.status === 201) {
          alert('A name was submitted: ' + fullName);
          console.log(res)

        } else {
          console.log('error');

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
            Sign Up
            </Typography>
          <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
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
              ref={register}
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
              ref={register}
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
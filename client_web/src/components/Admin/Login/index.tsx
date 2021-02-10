import React, { useState } from 'react';
import axios from 'axios';
import { baseURL } from '../../../utils/index';
import { Redirect, Link } from 'react-router-dom';
import SignUp from '../Register/index';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';


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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState('');
  const [isLogin, setLogin] = useState(false);

  const handleSignIn = () => {
    axios.get(`${baseURL}business/login?email=${email}&password=${password}`)
      .then(res => {
        if (res.status === 200) {
          console.log(res.data);
          setLogin(true);
        }
      })
      .catch(err => {
        console.log(err);
      })
  }

  return (
    <div>
      {isLogin ?
        <Redirect to='/' />
        : ''
      }
      <Container component="main" maxWidth="xs">
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
              {/* <Grid item xs>
                <Link to='/SignUp'>
                  Forgot password?
              </Link>
              </Grid> */}
              <Grid item >
                <Link to='/admin/SignUp' >
                  {"עדיין אין לך חשבון? הרשם"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </div>
  );
}
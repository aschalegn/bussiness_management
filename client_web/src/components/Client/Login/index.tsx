import React, { FormEvent, useState, useContext } from 'react';
import { Redirect, Link } from 'react-router-dom';
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

export default function SignIn() {
  const classes = useStyles();
  const { signInClient, user } = useContext(userContext);
  const [phone, setPhone] = useState('')

  const handleSignIn = (e: FormEvent) => {
    e.preventDefault();
    signInClient(phone);
  }

  return (
    <div>
      {user.type ?
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
            כניסה
        </Typography>
          <form onSubmit={handleSignIn} className={classes.form} noValidate>

            <TextField
              variant="outlined"
              margin="normal"
              inputProps={{ pattern: "[0-9]{3}-[0-9]{3}-[0-9]{4}" }}
              required
              fullWidth
              id="phone"
              label="טלפון"
              name="phone"
              autoComplete="phone"
              onChange={(e) => setPhone(e.target.value)}
              autoFocus
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
              התחבר
          </Button>
            <Grid container>
              <Grid item xs>
                <Link to='/SignUp' >
                  Forgot password?
              </Link>
              </Grid>
              <Grid item>
                <Link to='/SignUp'  >
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </div>
  );
}
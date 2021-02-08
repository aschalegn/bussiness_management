import React from 'react';
import axios from 'axios';
import { baseURL } from '../../../../utils/index';
import {
  createStyles, makeStyles, Theme, Button, TextField, Dialog, DialogActions,
  DialogContent, DialogContentText, DialogTitle, FormControl, Select, MenuItem, InputLabel
} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }),
);

export default function AddWorkers() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  // const [age, setAge] = React.useState('');


  const [name, setName] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [role, setRole] = React.useState('');
  const [openAt, setOpenAt] = React.useState('');
  const [closeAt, setCloseAt] = React.useState('');
  const [jump, setJump] = React.useState('');
  const [skills, setSkills] = React.useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClickClose = () => {
    setOpen(false);
  };



  const handleChange = (event: any) => {
    if (event.target.name === 'role') {
      setRole(event.target.value);
    }
    setJump(event.target.value);
  };

  const setNewWorker = () => {
    const data = {
      name,
      phone,
      openAt,
      closeAt,
      jump,
      role,
      skills
    }
    console.log(data, 'data from new worker');
    axios.patch(`${baseURL}business/setting/addWorker/60213db13f53a228b4a40497`, data)
      .then(res => {
        if (res.status === 200) {
          console.log('success');
        }
        else {
          console.log(`error code ${res.status}`)
        }
      }).catch(error => {
        console.log(error.message.conflict);
      })
  }

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        הוספת  עובד חדש
            </Button>
      <Dialog open={open} onClose={handleClickClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">הוספת עובד</DialogTitle>
        <DialogContent>
          <DialogContentText>

          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="שם העובד"
            type="text"
            fullWidth
            onChange={e => setName(e.target.value)}
          />
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">סוג עובד</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={role}
              name='role'
              onChange={handleChange}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>

          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="טלפון"
            type="tel"
            fullWidth
            onChange={e => setPhone(e.target.value)}
          />

          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="כישורים"
            type="text"

            fullWidth
            onChange={e => setPhone(e.target.value)}
          />

          <TextField
            autoFocus
            margin="dense"
            id="name"
            // label="p,hjv"
            type="time"
            fullWidth
            onChange={e => setOpenAt(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            // label=""
            type="time"
            fullWidth
            onChange={e => setCloseAt(e.target.value)}
          />
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">זמן תספורת</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={jump}
              name='jump'
              onChange={handleChange}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>


        </DialogContent>

        <DialogActions>
          <Button onClick={handleClickClose} color="secondary">
            חזור
          </Button>
          <Button onClick={setNewWorker} color="primary">
            שמירת נתונים
          </Button>
        </DialogActions>
      </Dialog >
    </div >
  );
}
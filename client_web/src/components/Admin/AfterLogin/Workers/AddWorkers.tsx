import React, { FormEvent, useState, useContext } from 'react';
import axios from 'axios';
import { baseURL } from '../../../../utils/index';
import {
  TextField, FormControl, Select, MenuItem, InputLabel
} from '@material-ui/core';
import "./AddWorkers.css";
import { userContext } from '../../../../context/User';
import AdminNav from '../../../Layouts/AppBar/AdminNav';
import { Button, Dialog, DialogActions, DialogTitle } from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

type Props = { open: boolean, setOpen: any }

export default function AddWorkers({ open, setOpen }: Props) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('');
  const [openAt, setOpenAt] = useState('');
  const [closeAt, setCloseAt] = useState('');
  const [jump, setJump] = useState('');
  const [skills, setSkills] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [file, setProfile] = useState<string | File>("");
  const { user } = useContext(userContext);
  const handleClickClose = () => {
    setOpen(false);
  };

  const handleChangeOnSelect = (event: any) => {
    if (event.target.name === 'role') {
      setRole(event.target.value);
    }
    if (event.target.name === 'jump') {
      setJump(event.target.value);
    }
  };

  const setNewWorker = (e: FormEvent) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("name", name);
    fd.append("phone", phone);
    fd.append("openAt", openAt);
    fd.append("closeAt", closeAt);
    fd.append("jump", jump);
    fd.append("role", role);
    fd.append("skills", skills);
    fd.append("password", password);
    fd.append("email", email);
    fd.append("profile", file);

    axios.patch(`${baseURL}business/setting/addWorker/6028e4f2ed8a283230f4bc6c`, fd)
      .then(res => {
        if (res.status === 200) {
          console.log('success', res.data);
        }
        else {
          console.log(`error code ${res.status}`)
        }
      }).catch(error => {
        console.log(error.message.conflict);
      })
  }
  return (
    <>
      {/* <AdminNav location="הוספת עובד"/> */}
      {/* <form onSubmit={setNewWorker} className="AddWorkers">
        <TextField
          required
          autoFocus
          margin="dense"
          id="name"
          label="שם העובד"
          type="text"
          fullWidth
          onChange={e => setName(e.target.value)}
        />
        <FormControl>
          <InputLabel>סוג עובד</InputLabel>
          <Select
            required
            id="worker type"
            value={role}
            name='role'
            onChange={handleChangeOnSelect}
          >
            <MenuItem value={"worker"}>עובד</MenuItem>
            <MenuItem value={"manager"}>מנהל</MenuItem>
          </Select>
        </FormControl>
        <TextField
          required
          autoFocus
          margin="dense"
          id="name"
          label="טלפון"
          type="phone"
          fullWidth
          onChange={e => setPhone(e.target.value)}
        />
        <TextField
          required
          autoFocus
          margin="dense"
          id="email"
          label="אימייל"
          type="email"
          fullWidth
          onChange={e => setEmail(e.target.value)}
        />
        <TextField
          required
          autoFocus
          margin="dense"
          id="password"
          label="סיסמה"
          type="password"
          fullWidth
          onChange={e => setPassword(e.target.value)}
        />
        <TextField
          autoFocus
          margin="dense"
          id="skills"
          label="כישורים"
          type="text"
          fullWidth
          onChange={e => setSkills(e.target.value)}
        />

        <TextField
          required
          autoFocus
          margin="dense"
          id="openAt"
          type="time"
          fullWidth
          onChange={e => setOpenAt(e.target.value)}
        />
        <TextField
          required
          autoFocus
          margin="dense"
          id="closeAt"
          type="time"
          fullWidth
          onChange={e => setCloseAt(e.target.value)}
        />
        <FormControl>
          <InputLabel id="demo-simple-select-label">זמן תספורת</InputLabel>
          <Select
            required
            labelId="demo-simple-select-label"
            id="jump"
            value={jump}
            name='jump'
            onChange={handleChangeOnSelect}
          >
            <MenuItem value={15}>15</MenuItem>
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={30}>30</MenuItem>
          </Select>
        </FormControl>
        <br /> <br />
        <label htmlFor="profile"></label>
        <input type="file" name="profile" id="profile" title="profile"
          onChange={(e) => {
            const files = e.target.files;
            if (files) {
              console.log(files[0]);
              setProfile(files[0])
            }
          }}
        />
        <br /> <br />
        <button onClick={setNewWorker} className="actionBtn">
          שמירת נתונים
        </button>
      </form> */}

      <Dialog open={open} onClose={handleClickClose} aria-labelledby="form-dialog-title" className="makeAppointment">
        <NavigateNextIcon onClick={handleClickClose} />
        <DialogTitle id="form-turn-title"> הוספת עובד</DialogTitle>
        <form onSubmit={setNewWorker} className="AddWorkers">
          <TextField
            required
            autoFocus
            margin="dense"
            id="name"
            label="שם העובד"
            type="text"
            fullWidth
            onChange={e => setName(e.target.value)}
          />
          <FormControl>
            <InputLabel>סוג עובד</InputLabel>
            <Select
              required
              id="worker type"
              value={role}
              name='role'
              onChange={handleChangeOnSelect}
            >
              <MenuItem value={"worker"}>עובד</MenuItem>
              <MenuItem value={"manager"}>מנהל</MenuItem>
            </Select>
          </FormControl>
          <TextField
            required
            autoFocus
            margin="dense"
            id="name"
            label="טלפון"
            type="phone"
            fullWidth
            onChange={e => setPhone(e.target.value)}
          />
          <TextField
            required
            autoFocus
            margin="dense"
            id="email"
            label="אימייל"
            type="email"
            fullWidth
            onChange={e => setEmail(e.target.value)}
          />
          <TextField
            required
            autoFocus
            margin="dense"
            id="password"
            label="סיסמה"
            type="password"
            fullWidth
            onChange={e => setPassword(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="skills"
            label="כישורים"
            type="text"
            fullWidth
            onChange={e => setSkills(e.target.value)}
          />

          <TextField
            required
            autoFocus
            margin="dense"
            id="openAt"
            type="time"
            fullWidth
            onChange={e => setOpenAt(e.target.value)}
          />
          <TextField
            required
            autoFocus
            margin="dense"
            id="closeAt"
            type="time"
            fullWidth
            onChange={e => setCloseAt(e.target.value)}
          />
          <FormControl>
            <InputLabel id="demo-simple-select-label">זמן תספורת</InputLabel>
            <Select
              required
              labelId="demo-simple-select-label"
              id="jump"
              value={jump}
              name='jump'
              onChange={handleChangeOnSelect}
            >
              <MenuItem value={15}>15</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={30}>30</MenuItem>
            </Select>
          </FormControl>
          <br /> <br />
          <label htmlFor="profile"></label>
          <input type="file" name="profile" id="profile" title="profile"
            onChange={(e) => {
              const files = e.target.files;
              if (files) {
                setProfile(files[0]);                
              }
            }}
          />
          <DialogActions>
            <Button onClick={handleClickClose} color="secondary">
              חזור
                        </Button>
            <Button type='submit' color="primary">
              שמירת עובד
                        </Button>
          </DialogActions>
        </form>
      </Dialog >

    </>
  );
}
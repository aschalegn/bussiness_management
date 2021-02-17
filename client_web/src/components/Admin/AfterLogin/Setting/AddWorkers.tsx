import React, { FormEvent } from 'react';
import axios from 'axios';
import { baseURL } from '../../../../utils/index';
import {
  TextField, FormControl, Select, MenuItem, InputLabel
} from '@material-ui/core';

import "./AddWorkers.css"
import AdminNav from '../../../Layouts/AppBar/AdminNav';
export default function AddWorkers() {
  const [name, setName] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [role, setRole] = React.useState('');
  const [openAt, setOpenAt] = React.useState('');
  const [closeAt, setCloseAt] = React.useState('');
  const [jump, setJump] = React.useState('');
  const [skills, setSkills] = React.useState('');

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
    const data = {
      name,
      phone,
      openAt,
      closeAt,
      jump,
      role,
      skills
    }

    axios.patch(`${baseURL}business/setting/addWorker/6028e4f2ed8a283230f4bc6c`, data)
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
    <>
      {/* <AdminNav location="הוספת עובד"/> */}
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
          autoFocus
          margin="dense"
          id="skills"
          label="כישורים"
          type="text"
          fullWidth
          onChange={e => setPhone(e.target.value)}
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
        <button onClick={setNewWorker} className="actionBtn">
          שמירת נתונים
        </button>
      </form>
    </>
  );
}
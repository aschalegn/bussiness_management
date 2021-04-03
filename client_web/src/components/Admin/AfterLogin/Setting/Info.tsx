import { Button } from '@material-ui/core';
import axios from 'axios';
import React, { FormEvent, useContext } from 'react'
import { userContext } from '../../../../context/User';
import { baseURL } from '../../../../utils';
import "./Info.css";
export default function Info() {
   const { user } = useContext(userContext);
   const initialState = {
      name: user.name,
      email: user.email,
      phones: user.phones,
      times: user.times
   };

   const handleSubmit = (e: FormEvent) => {
      e.preventDefault();
      console.log(initialState);
      axios.patch(`${baseURL}business/6028e4f2ed8a283230f4bc6c`, initialState)
         .then(res => {
            console.log(res);
            if (res.status === 200) {

            }
         })
   };

   return (
      <div className="info">
         <h3>מידע כללי</h3>
         <form onSubmit={handleSubmit}>
            <div className="group">
               <label htmlFor="name">שם העסק</label>
               <input type="text" defaultValue={initialState.name} id="name" name="name" aria-label="name"
                  onChange={(e) => {
                     initialState.name = e.target.name;
                  }} />
            </div>
            <div className="group">
               <label htmlFor="email">אי-מייל</label>
               <input type="email" defaultValue={initialState.email} id="email" name="email" aria-label="email"
                  onChange={(e) => {
                     initialState.name = e.target.name;
                  }} />
            </div>
            <div className="phones">
               <h4>טלפונים</h4>
               {initialState.phones.map((phone: string, i: number) =>
                  <div key={i} className="group">
                     <label htmlFor="phone"> טלפון {i + 1}</label>
                     <input type="text" defaultValue={phone} id="phone" name="phone" aria-label="phone" onChange={(e) => {
                        initialState.phones[i] = e.target.value;
                     }} />
                  </div>
               )}
            </div>
            <div className="times">
               <h4>שעות פעילות</h4>
               <div className="group">
                  <label htmlFor="openAt">שעת פתיחה</label>
                  <input type="time" defaultValue={initialState.times?.openAt} id="openAt" name="openAt" aria-label="openAt"
                     onChange={(e) => {
                        initialState.times.openAt = e.target.value;
                        console.log(initialState.times);
                     }} />
               </div>
               <div className="group">
                  <label htmlFor="closeAt">שעת סגירה</label>
                  <input type="time" defaultValue={initialState.times?.closeAt} id="closeAt" name="closeAt" aria-label="closeAt"
                     onChange={(e) => {
                        initialState.times.closeAt = e.target.value;
                     }} />
               </div>
            </div>
            <br />
            <Button variant="contained" color="primary" type="submit">עדכן</Button>
            {/* <button ></button> */}
         </form>
      </div>
   )
}

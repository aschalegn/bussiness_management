import React, { Component } from 'react';
import axios from 'axios';
import { baseURL } from '../../../../utils/index';
import { Modal, Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';


class SelectManagerType extends Component {

state= {name:String,phone:String,typeWorker:String,openAt:String,closeAt:String,jump:Number,role:String,skills:String}
  
 setNewWorker = () => {
     const data = {
         name:this.state.name,
         phone:this.state.phone,
        typeWorker:this.state.typeWorker,
        openAt:this.state.openAt,
        closeAt:this.state.closeAt,
        jump:this.state.jump,
        role:this.state.role,
        skills:this.state.skills
     }
     console.log(data,'data from new worker');
    axios.patch(`${baseURL}busines/workers`, data)
        .then(res => {
        if (res.status === 201) {
            console.log('success');
        }
        else{
            console.log(`error code ${res.status}`)
        }
    }).catch(error => {
    console.log(error.message.conflict);
    })
}

render() {
    //   console.log(this.state);
        return (
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        הוספת  עובד חדש
                        
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <input type="text" placeholder='שם העובד' onChange={e=>this.setState({ name:e.target.value })} />
                <br/><br/>
                <select onChange={(e)=>{console.log(e.target.value);}}>
                <option>מנהל</option>
                <option >עובד</option>
                </select>
               : סוג עובד

               <br/><br/>
               <input type="tel" name="" id="" placeholder='טלפון' onChange={e=>this.setState({ phone:e.target.value })}/>
               <br/><br/>
               <input type="text" placeholder='כישורים' onChange={e=>this.setState({ skills:e.target.value })}/>
                        <br/><br/>

                        <input type="time" onChange={e=>this.setState({ openAt:e.target.value })}/>:פתיחה
                        <br/>
                        <input type="time" onChange={e=>this.setState({ closeAt:e.target.value })}/>:סגירה
                        <br/><br/>
                       
                    
    
                        <select name="" id="" onChange={e=>this.setState({ jump:e.target.value })}>
                            <option type='number'>15</option>
                            <option type='number'>20</option>
                            <option type='number'>30</option>
                        </select> 
                        :זמן תספורת


                </Modal.Body>
                <Modal.Footer>
                <Button variant='success' onClick={this.setNewWorker}>שמירת נתונים</Button>
                    <img src='https://www.freepik.com/premium-vector/men-hair-moustache-styling-vintage-gentleman-haircut-beauty-beard-fashion-mustaches-styles-illustration-set_8636976.htm' alt='' />
                    <Button variant='danger' onClick={this.props.onHide}>חזור</Button>
                </Modal.Footer>
            </Modal >

        );
    }
}

export default SelectManagerType;
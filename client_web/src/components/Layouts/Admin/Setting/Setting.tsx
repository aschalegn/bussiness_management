import React, { useState } from 'react'
import { ButtonToolbar } from 'react-bootstrap';
import WorkerDetails from './workerDetails';

function Setting() {
    const [ManagerTypeShow, setManagerTypeShow]= useState(false);
    let ManagerTypeClose = () => {setManagerTypeShow(false)}

    return (
        <div>
                <h1>setting</h1>
                <ButtonToolbar>
                            <button className='btnTypeManager' onClick={() => {
                              setManagerTypeShow(true)
                            }}>הוספת עובד חדש</button>
                            <WorkerDetails
                                show={ManagerTypeShow}
                                onHide={ManagerTypeClose}
                            />
                        </ButtonToolbar>
        </div>
    )
}
export default Setting;
import React, { useContext, useState } from 'react';
import { userContext } from '../../../../context/User';
import AddWorkers from './AddWorkers';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import AdminNav from '../../../Layouts/AppBar/AdminNav';
export default function WorkersHome() {
    const { user } = useContext(userContext);
    const [addWorker, setAddWorker] = useState(false);
    return (
        <div>
            {addWorker ? <AddWorkers /> : ''}
            <AdminNav location="עובדים" />
            <section className="workersPage">
                {user.workers.map(worker =>
                    <article className="worker">
                        <img src={worker.profile} alt={worker.name} />
                        <h4>{worker.name}</h4>
                        <p>{worker.phone}</p>
                        <p>{worker.email}</p>
                    </article>
                )}
                <article className="worker">
                    <button type="button" onClick={() => setAddWorker(!addWorker)}>
                        <AddCircleIcon /><br />
                    הוסף עובד
                    </button>
                </article>
            </section>
        </div>
    );
}

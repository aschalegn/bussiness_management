import React, { useContext, useState } from 'react';
import { userContext } from '../../../../context/User';
import AddWorkers from './AddWorkers';

export default function WorkersHome() {
    const { user } = useContext(userContext);
    const [addWorker, setAddWorker] = useState(false);
    return (
        <div>
            <button type="button" onClick={() => setAddWorker(!addWorker)}>הוסף עובד</button>
            {addWorker ? <AddWorkers /> : ''}
            <table>
                <thead>
                    <tr></tr>
                </thead>
                <tbody>
                    {user.workers.map(worker =>
                        <tr>
                            <td>{worker.name}</td>
                            <td>{worker.phone}</td>
                            <td>{worker.email}</td>
                        </tr>
                    )}

                </tbody>
            </table>
        </div>
    );
}

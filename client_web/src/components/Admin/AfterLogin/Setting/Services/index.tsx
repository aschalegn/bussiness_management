import { Button } from '@material-ui/core';
import React, { useContext, useState } from 'react'
import { userContext } from '../../../../../context/User';
import AddServices from './AddServices';

export default function Services() {
    const { user } = useContext(userContext);
    const [add, setAdd] = useState(false);

    return (
        <div>
            <h3>שירותים</h3>
            <Button variant="outlined" color="primary"
                onClick={() => {
                    setAdd(!add)
                }}>הוסף שירות</Button>
            {user.services.length > 0 ?
                <table>
                    <tbody>
                        {user.services.map((service, i) =>
                            <tr key={i}>
                                <td>{service.name}</td>
                                <td>{service.price}</td>
                                <td><img src={service.img} alt="" /></td>
                            </tr>
                        )}
                    </tbody>
                </table> :
                <p> לא נמצאו שירותים</p>
            }
            {add ? <AddServices /> : ''}
        </div>
    )
}

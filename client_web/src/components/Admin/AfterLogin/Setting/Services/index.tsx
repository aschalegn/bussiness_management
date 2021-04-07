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
                <section className="serviceList">
                    {user.services.map((service, i) =>
                        <article key={i}>
                            <h3>{service.name}</h3>
                            <p>{service.price}</p>
                            <img src={service.img} alt="" />
                        </article>
                    )}
                </section> :
                <p> לא נמצאו שירותים</p>
            }
            {add ? <AddServices /> : ''}
        </div>
    )
}

import React, { useState } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Info from './Info';
import AddWorkers from './AddWorkers';
import AdminNav from '../../../Layouts/AppBar/AdminNav';
import LogoAndPoster from './LogoAndPoster';

export default function Main() {
    const [value, setValue] = useState(0);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };
    return (
        <>
            <AdminNav location="הגדרות" />
            <Tabs value={value} onChange={handleChange} aria-label="tabs for settings">
                <p onClick={() => { setValue(0) }}>מידע כללי</p>
                <p onClick={() => { setValue(1) }}>עובדים</p>
                <p onClick={() => { setValue(2) }}>תמונות</p>
            </Tabs>
            {value === 0 ?
                <Info />
                :
                value === 1 ?
                    <AddWorkers />
                    :
                    <LogoAndPoster />
            }
        </>
    );
}

import React, { useState } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Info from './Info';
import AdminNav from '../../../Layouts/AppBar/AdminNav';
import LogoAndPoster from './LogoAndPoster';
import Services from './Services';

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
                <p onClick={() => { setValue(1) }}>תמונות</p>
                <p onClick={() => { setValue(2) }}>שירותים </p>
                <p onClick={() => { setValue(3) }}>התראות </p>
            </Tabs>
            {value === 0 ?
                <Info />
                :
                value === 1 ?
                    <LogoAndPoster />
                    : value === 2 ?
                        <Services />
                        :
                        ''
            }
        </>
    );
}

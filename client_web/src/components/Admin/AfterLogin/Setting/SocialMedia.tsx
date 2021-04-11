import React, { FormEvent, useState, useContext } from 'react'
import axios from 'axios';
import { userContext } from '../../../../context/User';
import './SocialMedia.css';

export default function SocialMedia() {
    const { user } = useContext(userContext);
    const [instagram, setInstagram] = useState({ name: 'instagram', link: user.socialMedia[0].link });
    const [facebook, setFacebook] = useState({ name: 'facebook', link: user.socialMedia[1].link });
    const [whatsApp, setWhatsApp] = useState({ name: 'whatsApp', link: user.socialMedia[2].link });

    const updateSocial = (e: FormEvent) => {
        e.preventDefault();
        const social = [instagram, facebook, whatsApp];
        axios.patch(`/api/business/setting/social/${user._id}`, social)
            .then(res => {
                if (res.status === 200) {
                    console.log(res);
                };
            }).catch(err => {
                console.log(err);
            });
    }

    return (
        <div className="socialMedia">
            <h1>תהיה עם הלקוחות בכל מקום</h1>
            <form onSubmit={updateSocial}>
                <div className="social"> <label>אינסטגרם</label>
                    <input type="text" title="instegram_link" name="instegram_link" defaultValue={user.socialMedia[0].link}
                        onChange={(e) => { setInstagram({ name: 'instagram', link: e.target.value }) }} /> <br /></div>
                <div className="social"><label>פייסבוק</label>
                    <input type="text" title="facebook_link" name="facebook_link" defaultValue={user.socialMedia[1].link}
                        onChange={(e) => { setFacebook({ name: 'facebook', link: e.target.value }) }} /> <br /></div>
                <div className="social"> <label htmlFor="link">WhatsApp:</label>
                    <input type="text" title="name" name="whatsApp" id="whatsApp" defaultValue={user.socialMedia[2].link}
                        onChange={(e) => { setWhatsApp({ name: 'whatsApp', link: e.target.value }) }}
                    /> <br />
                </div>
                <button type="submit">עדכן</button>
            </form>
        </div>
    )
}

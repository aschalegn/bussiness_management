import axios from 'axios';
import React, { ChangeEvent, FormEvent, useContext, useState } from 'react';
import { userContext } from '../../../../context/User';
import { baseURL } from '../../../../utils';
import "./LogoAndPoster.css";
export default function LogoAndPoster() {
    const [logo, setLogo] = useState<string | Blob>("d");
    const [poster, setPoster] = useState<string | Blob>("");
    const { user } = useContext(userContext);
    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === "logo") {
            const files = e.target.files;
            if (files) {
                setLogo(files[0]);
            }
        }

        if (e.target.name === "poster") {
            const files = e.target.files;
            if (files) {
                setPoster(files[0]);
            }
        }
    }

    const upload = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("logo", logo);
        formData.append("poster", poster);
        axios.patch(`${baseURL}business/files/6028e4f2ed8a283230f4bc6c`, formData)
            .then(res => {
                console.log(res);
            })
        // console.log({ logo, poster });
    };

    return (
        <>
            <section className="imagesTab">
                <form onSubmit={upload}>
                    <div className="group">
                        <img src={user.logo} alt={user.name} />
                        <label htmlFor="logo">לוגו</label>
                        <input type="file" name="logo" id="logo" onChange={changeHandler} />
                    </div>
                    <div className="group">
                        <img src={user.poster} alt={user.name} />
                        <label htmlFor="poster">תמונת/וידאו נושא</label>
                        <input type="file" name="poster" id="poster" onChange={changeHandler} />
                    </div>
                    <button type="submit">העלה</button>
                </form>
            </section>
        </>
    )
}

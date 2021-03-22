import { Button } from '@material-ui/core';
import axios from 'axios';
import React, { FormEvent, useState, useContext } from 'react'
import { userContext } from '../../../../../context/User';
import "./Services.css";

export default function AddServices() {
    const [name, setName] = useState<string>("");
    const [img, setImg] = useState<string | Blob>("");
    const [price, setPrice] = useState<string | Blob>("");
    const { user } = useContext(userContext);
    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const fd = new FormData();
        fd.append("name", name);
        fd.append("price", price);
        fd.append("img", img);
        axios.patch("/api/business/setting/services/6028e4f2ed8a283230f4bc6c", fd)
            .then(res => {
                if (res.status === 200) {
                    console.log(res.data);
                    user.services.push(res.data);
                };
            });
    };

    return (
        <div className="Services">
            <form onSubmit={submitHandler}>
                <div className="group">
                    <label htmlFor="name">שם השירות</label>
                    <input type="text" id="name" name="name"
                        onChange={(e) => { setName(e.target.value) }}
                    />
                </div>
                <div className="group">
                    <label htmlFor="price">מחיר</label>
                    <input type="number" id="price" name="price"
                        onChange={(e) => { setPrice(e.target.value) }}
                    />
                </div>
                <div className="group">
                    <label htmlFor="img">תמונה</label>
                    <input type="file" id="img" name="img"
                        onChange={(e) => {
                            const files = e.target.files;
                            if (files) {
                                console.log(files[0]);
                                setImg(files[0])
                            }
                        }}
                    />
                </div>
                <Button variant="contained" color="primary" type="submit">עדכן</Button>
            </form>
        </div>
    );
}

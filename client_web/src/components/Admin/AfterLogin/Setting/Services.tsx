import React, { FormEvent, useState } from 'react'

export default function Services() {
    const [style, setStyle] = useState<string>("");
    const [img, setImg] = useState<string | Blob>("");
    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const fd = new FormData();
        fd.append("style", style);
        fd.append("img", img);
    }

    return (
        <div>
            <form onSubmit={submitHandler}>
                <div className="group">
                    <label htmlFor="style">סטיל</label>
                    <input type="text" id="style" name="style"
                        onChange={(e) => { setStyle(e.target.value) }}
                    />
                </div>
                <div className="group">
                    <label htmlFor="img">תמונה</label>
                    <input type="file" id="img" name="img"
                        onChange={(e) => {
                            const files = e.target.files;
                            if (files) {
                                setImg(files[0])
                            }
                        }}
                    />
                </div>
                <button type="submit">העלה</button>
            </form>
        </div>
    );
}

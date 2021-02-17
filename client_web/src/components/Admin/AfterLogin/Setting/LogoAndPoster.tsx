import React from 'react'

export default function LogoAndPoster() {
    return (
        <>
            <div className="group">
                <label htmlFor="logo">לוגו</label>
                <input type="file" name="logo" id="logo" />
            </div>
            <div className="group">
                <label htmlFor="logo">תמונת/וידאו נושא</label>
                <input type="file" name="logo" id="logo" />
            </div>
        </>
    )
}

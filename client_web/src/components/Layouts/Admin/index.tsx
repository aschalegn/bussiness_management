import React, { useEffect } from 'react';
import socketClient from "socket.io-client";
type Props = {
    children: JSX.Element[]
}
export default function Admin({ children }: Props) {
    // const io = socketClient.io(`http://127.0.0.1:1000`);
    // io.on("turnMade", (data: any) => {
    //     console.log(data);
    // });

    return (
        <>
            {children}
        </>
    );
}

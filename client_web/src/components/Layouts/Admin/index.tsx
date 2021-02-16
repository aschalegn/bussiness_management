import React, { useEffect } from 'react';
type Props = {
    children: JSX.Element[]
}
export default function Admin({ children }: Props) {
    
    return (
        <>
            {children}
        </>
    );
}

import React from 'react';
type Props = {
    children?: JSX.Element[]
}

export default function Worker({ children }: Props) {
    return (
        <>
            {children}
        </>
    );
}
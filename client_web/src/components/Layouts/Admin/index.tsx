import { type } from 'os'
import React from 'react'
type Props = {
    children: JSX.Element[]
}
export default function Admin({ children }: Props) {
    return (
        <div>
            {children}
        </div>
    )
}

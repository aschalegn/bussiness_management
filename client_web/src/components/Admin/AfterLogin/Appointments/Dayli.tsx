import React, { useContext } from 'react';
import { userContext } from '../../../../context/User';
interface IAppointment {
    client: { fullName: string },
    barber: string,
    date: string,
    time: string,
    style: string,
    bussiness: string,
};

type Props = {
    appointments: IAppointment[]
};

export default function Dayli({ appointments }: Props) {
    console.log(appointments);
    const { user } = useContext(userContext);
    return (
        <table>
            <thead>
                <tr>
                    <th>שעה</th>
                    <th>לקוח</th>
                    <th>תספורת</th>
                </tr>
            </thead>
            <tbody>
                {appointments.map((ap, i) =>
                    <tr key={i}>
                        <td>{ap.time}</td>
                        <td>{ap.client.fullName}</td>
                        <td>{ap.style || "fdgf"}</td>
                    </tr>
                )}
            </tbody>
        </table>
    )
}

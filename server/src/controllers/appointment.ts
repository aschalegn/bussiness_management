import { Request, Response } from 'express';
import { appointmentEmitter } from "../eventsNotification/Appointments";
import { Appointment } from "../model/Appointment"
import { Business } from "../model/Bussiness";
import { Client } from "../model/Client";
class AppointmentContreller {
    // ! non register user
    makeByBussines = async (bussinessId: string, data: any, clientId: string) => {
        const appointment = new Appointment();
        const business = await Business.findById(bussinessId);
        if (await business) {
            business.appointments.push(appointment);
            const client = Business.findById(clientId);
            business.appointments.push(appointment);
            await business.save();
            await client.save();
            return appointment;
        }
        return false;
    }

    makeByClient = async (bussinessId: string, data: any, userId: string) => {
        const body = { time: data.time, barber: data.barber, client: userId }
        const appointment = new Appointment(body);
        const client = await Client.findById(userId);
        if (await client) {
            client.appointments.push(appointment);
            const business = await Business.findById(bussinessId);
            business.appointments.push(appointment);
            await business.save();
            await client.save();
            await appointment.save();
            // return appointmentEmitter.emit("made", bussinessId, appointment);
            return appointment;
        } else return false;
    }

    getByClient = async (userId: string) => {
        const client = await Client.findById(userId)
        if (await client) {
            console.log(client.appointments);
            return true
        } else {
            console.log('error get all');

        }
    }

    update = async (appointmentId: string) => {
        return true
    }

    delete = async (appointmentId: string) => {
        const appointment = await Appointment.findById(appointmentId);
        if (await appointment) {
            console.log(appointment);
            const client = await Client.findById(appointment.client);
            client.appointments.filter((ap: string) => { return ap !== appointmentId });
            const business = await Client.findById(appointment.business);
            business.appointments.filter((ap: string) => { return ap !== appointmentId });
            appointment.delete(); //? works
            client.save();
            business.save();
            appointmentEmitter.emit("deleted", appointmentId);
            return appointment;
        }
        return false;
    }
}


// const getAllapoointmentbyclientId = (req: Request, res: Response) => {
//     const { userId } = req.params;
//     return Client.findById(userId)
//         .then((appointment: any) => {
//             console.log(appointment);

//             // res.status(200).send(appointment);
//         })
//         .catch((err: any) => {
//             console.log(err);
//             // res.status(500);
//         });
// }

export { AppointmentContreller };
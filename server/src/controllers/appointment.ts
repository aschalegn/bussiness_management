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
        }else return false;
    }

    update = async (appointmentId: string) => {
        // Todo: update appointmet
        return true;
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

export { AppointmentContreller };
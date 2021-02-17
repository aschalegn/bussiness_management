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
        data.client = userId;
        console.log(data);
        
        const appointment = new Appointment(data);
        const client = await Client.findById(userId);
        if (await client) {
            // console.log(client);
            await client.appointments.push(appointment);
            const business = await Business.findById(bussinessId);
            
            await business.appointments.push(appointment);
           
            await business.save();
            console.log(await business);
            await client.save();
           
            await appointment.save();
            // return appointmentEmitter.emit("made", bussinessId, appointment);
            return appointment;
        } else return false;
    }

    getByClient = async (userId: string) => {
        const client = await Client.findById(userId)
            .select("client")
            .populate({
                path: "appointments",
                populate: { path: "appointments" }
            });
        if (await client) {
            return client
        } else {
            console.log('error get all');

        }
    }

    getByBusiness = async (userId: string) => {
        const business = await Business.findById(userId)
            .select("appointments, workers")
            .populate({
                path: "appointments",
                populate: { path: "client" }
            });
        if (await business) {
            return business
        } else {
            console.log('error get all');
        }
    }

    getWeekly = async (userId: string) => {
        const business = await Business.findById(userId)
            .select("appointments")
            .populate({
                path: "appointments",
                populate: { path: "client" }
            });
        if (await business) {
            return business
        } else {
            console.log('error get all');
        }
    }

    update = async (appointmentId: string, body: any) => {
        const appointment = await Appointment.findByIdAndUpdate(appointmentId, body);
        console.log(appointment);

        return appointment;
    }

    delete = async (appointmentId: string) => {
        const appointment = await Appointment.findByIdAndDelete(appointmentId);

        if (await appointment) {
            console.log(appointment);

            const client = await Client.findById(appointment.client);
            const deletefromClient = await client.appointments.filter((ap: string) => { return ap !== appointmentId });
            const business = await Business.findById(appointment.business);
            const deletefromBusiness = await business.appointments.filter((ap: string) => { return ap !== appointmentId });
            // appointment.delete(); //? works
            client.appointments = deletefromClient;
            business.appointments = deletefromBusiness;
            client.save();
            business.save();
            // appointmentEmitter.emit("deleted", appointmentId);
            return appointment;
        }
        return false;
    }
}

export { AppointmentContreller };
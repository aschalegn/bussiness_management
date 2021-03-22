import { Request, Response } from 'express';
import { appointmentEmitter, EmitterIO } from "../eventsNotification/Appointments";
import { Appointment } from "../model/Appointment"
import { Business } from "../model/Bussiness";
import { Client } from "../model/Client";
import moment from "moment";

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
        const appointment = new Appointment(data);
        const client = await Client.findById(userId);
        if (await client) {
            await client.appointments.push(appointment);
            const business = await Business.findById(bussinessId);
            await business.appointments.push(appointment);
            await business.save();
            await appointment.save();
            await client.save();
            const apToSend = await Appointment.findById(appointment._id).populate("client")
            appointmentEmitter.emit("made", bussinessId, apToSend);
            return appointment;
        }
        else return false;
    }

    getByClient = async (userId: string) => {
        const client = await Client.findById(userId)
            .select("client")
            .populate({
                path: "appointments",
                populate: { path: "appointments" }
            });
        if (await client) {
            return client;
        } else {
            console.log('error get all');
        }
    }

    getByBusiness = async (userId: string) => {
        const business = await Business.findById(userId, {})
            .select("appointments")
            .populate({
                path: "appointments",
                populate: { path: "client" }
            });
        if (await business) {
            return business.appointments
        } else {
            console.log('error get all');
        }
    }

    // Array<string>
    getByBusinessAgr = async (id: string, date: any) => {
        const business = await Business.findById(id)
            .select("appointments")
            .populate({
                path: "appointments",
                match: { date: date }
            });
        return business;
    }

    getWeekly = async (userId: string, date: any) => {
        const business = await Business.findById(userId)
            .select("appointments")
            .populate({
                path: "appointments",
                match: { date: date },
                populate: { path: "client" }
            });
        if (await business) {
            return business
        } else {
            console.log('error get all');
        }
    }

    update = async (appointmentId: string, body: any) => {
        const appointment = await Appointment.findByIdAndUpdate(appointmentId, { body });
        return appointment;
    };

    delete = async (appointmentId: string) => {
        const appointment = await Appointment.findByIdAndDelete(appointmentId);

        if (await appointment) {
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
        };
        return false;
    };
};

// new AppointmentContreller()
//     .getByBusinessAgr("6028e4f2ed8a283230f4bc6c",
//     ["2021-02-16", "2021-02-18","2021-02-17" ]
//     )
//     .then(aps => {
//         console.log(aps);
//     });

export { AppointmentContreller };
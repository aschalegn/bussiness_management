import { Appointment } from "../model/Appointment"
import { Business } from "../model/Bussiness";
import { IAppointment } from "../interfaces/Appointment";
import { Client } from "../model/Client";

class AppointmentContreller {
    // ! non register user
    makeByBussines = async () => {
        
    }

    makeByClient = async (bussinessId: string, data: IAppointment) => {
        const appointment = new Appointment(data);
        const { phone } = data.client;
        const client = await Client.findOne({ phone: phone });
        if (await client) {
            client.appointments.push(appointment);
            const business = Business.findById(bussinessId);
            business.appointments.push(appointment);
            await business.save();
            await client.save();
            return appointment;
        }
        return false;
    }
}

export { AppointmentContreller };
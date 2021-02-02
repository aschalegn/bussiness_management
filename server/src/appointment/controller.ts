import { IAppointment } from "../interfaces/Appointment";
import { Appointment } from "../model/Appointment";

const addAppointment = async (body: IAppointment) => {
    const newTurn = new Appointment(body);
    await newTurn.save();
    return newTurn;
}

export { addAppointment }
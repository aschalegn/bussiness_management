import { Router, Request, Response } from 'express';
import mongoose, { ObjectId } from "mongoose";
// import { ObjectID } from "mongodb";
import { AppointmentContreller } from '../controllers/appointment';
import { appointmentEmitter } from '../eventsNotification/Appointments';
import { Appointment } from '../model/Appointment';
import { Business } from '../model/Bussiness';
import { Client } from '../model/Client';
const router = Router();



// router.get("/:userId", (req: Request, res: Response, next: any) => {
//     const { userId } = req.params;
//     console.log(userId);
    
//     Client.findById(userId, (err: any, appointments: any) => {
//         if (err) {
//             res.status(500).send({ msg: err.message });
//         } else {
//             console.log(appointments);

//         }
//     })
// })

router.get("client/:userId", (req: any, res: any, next: any) => {
    const { userId } = req.params;
    Business.findById(userId, (err: any, client: any) => {
        if (err) {
            res.status(500).send({ msg: err.message });
        } else {
            console.log(client.appointments);
            Appointment.findById(client.appointments, (error: any, turn: any) => {
                if (error) {
                    console.log(error);

                } else {
                    console.log(turn, 'turn');

                }
            })
        }
    })
})




router.post("/:bussinessId/:userId", (req, res) => {
    const body = req.body;
    const { bussinessId, userId } = req.params;
    new AppointmentContreller()
        .makeByClient(bussinessId, body, userId)
        .then(appointment => {
            // console.log(appointment);
            if (appointment) return res.status(201).send(appointment);
            // appointmentEmitter.emit("made", bussinessId, appointment);
        }).catch(err => {
            console.log(err);
            return res.status(500).send("didnot add");
        });
});




router.patch("/:id", (req, res) => {
    let { id } = req.params;
    new AppointmentContreller()
        .update(id)
        .then(appointment => {
            if (appointment) return res.status(200).send("updated sucssesfully");
        })
    return res.status(500).send("issues while updaying the appointment");
});

router.delete("/:id", (req, res) => {
    let { id } = req.params;
    new AppointmentContreller()
        .delete(id)
        .then(appointment => {
            if (appointment) return res.status(200).send("deleted sucssesfully");
        });
    return res.status(500).send("issues while deleting the appointment");
});

export default router;
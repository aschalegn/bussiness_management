import { Router, Request, Response } from 'express';
import { AppointmentContreller } from '../controllers/appointment';
import { appointmentEmitter } from '../eventsNotification/Appointments';
import { Appointment } from '../model/Appointment';
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

router.get("/client/:userId", (req, res) => {
    const { userId } = req.params;
    new AppointmentContreller()
        .getByClient(userId)
        .then(appointment => {
            if (appointment) {
                console.log(appointment);
                const appoint = Appointment.find({ appointment }).populate("appointments")
                console.log(appoint);

            }
        }).catch(err => {
            console.log(err);

        })
})

router.get("/business/:id", (req, res) => {
    const { id } = req.params;
    new AppointmentContreller()
        .getByBusiness(id)
        .then(appointments => {
            if (appointments) {
                res.status(200).send(appointments);
            }
        }).catch(err => {
            console.log(err);
        });
});

router.post("/:bussinessId/:userId", (req, res) => {
    const body = req.body;
    const { bussinessId, userId } = req.params;
    new AppointmentContreller()
        .makeByClient(bussinessId, body, userId)
        .then(appointment => {
            if (appointment) return res.status(201).send(appointment);
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
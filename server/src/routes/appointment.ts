import { Router } from 'express';
import mongoose from "mongoose";
import { AppointmentContreller } from '../controllers/appointment';
const router = Router();

router.post("/:bussinessId/:userId", (req, res) => {
    const body = req.body;
    const { bussinessId, userId } = req.params;
    new AppointmentContreller()
        .makeByClient(new mongoose.Schema.Types.ObjectId(bussinessId),
            body, new mongoose.Schema.Types.ObjectId(userId)
        ).then(appointment => {
            if (appointment) return res.status(201).send(appointment);
        });
    return res.status(500).send("didnot add");
});

router.patch("/:id", (req, res) => {
    let { id } = req.params;
    let newId = new mongoose.Schema.Types.ObjectId(id);
    new AppointmentContreller()
        .update(newId)
        .then(appointment => {
            if (appointment) return res.status(200).send("updated sucssesfully");
        })
    return res.status(500).send("issues while updaying the appointment");
});

router.delete("/:id", (req, res) => {
    let { id } = req.params;
    let newId = new mongoose.Schema.Types.ObjectId(id);
    new AppointmentContreller()
        .delete(newId)
        .then(appointment => {
            if (appointment) return res.status(200).send("deleted sucssesfully");
        });
    return res.status(500).send("issues while deleting the appointment");
});

export default router;
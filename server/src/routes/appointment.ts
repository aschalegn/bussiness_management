import { Router } from 'express';
import { AppointmentContreller } from '../controllers/appointment';
const router = Router();

router.post("/:bussinessId/:userId", (req, res) => {
    const body = req.body;
    const { bussinessId, userId } = req.params;
    new AppointmentContreller()
        .makeByClient(bussinessId, body, userId)
        .then(appointment => {
            if (appointment) return res.status(201).send(appointment);
            return res.status(500).send("didnot add");
        })
});

export default router;
import { Router } from 'express';
import { AppointmentContreller } from '../controllers/appointment';
const router = Router();

router.post("/client/:bussinessId", (req, res) => {
    const body = req.body;
    const { bussinessId } = req.params;
    new AppointmentContreller()
        .makeByClient(bussinessId, body)
        .then(appointment => {
            if (appointment) return res.status(201).send(appointment);
            return res.status(500).send("didnot add");
        })
});
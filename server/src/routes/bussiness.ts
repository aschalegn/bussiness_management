import { Request, Response, Router } from "express";
import { addBussiness, addWorker, getAvailableTimes, logIn, updatePassword } from "../controllers/bussiness";

const router = Router();

router.post("/", (req: Request, res: Response) => {
    addBussiness(req, res);
});

router.get("/login", (req, res) => {
    const { email, password } = req.query;
    logIn(email, password, res);
});

router.patch("/setting/addWorker/:id", (req, res) => {
    addWorker(req, res);
})

router.get("/:id", (req, res) => {
    getAvailableTimes(req, res);
})

router.patch("/updatePassword", (req, res) => {
    const { email, password } = req.body;
    updatePassword(email, password)
        .then((isUpdated: Boolean) => {
            if (isUpdated) return res.status(200).send(true);
            return res.status(500).send(false);
        });
});

export default router
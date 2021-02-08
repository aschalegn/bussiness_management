import { Request, Response, Router } from "express";
import { addBussiness, addWorker, logIn } from "../controllers/bussiness";
import { Business } from "../model/Bussiness";
const router = Router();

router.get("/", (req, res) => {
    res.status(200).send("working");
});

router.post("/", (req: Request, res: Response) => {
    addBussiness(req, res);
});

router.get("/login", (req, res) => {
    logIn(req, res);
});

router.patch("/setting/addWorker/:id",(req, res)=>{
    addWorker(req, res);
})






export default router
import { Request, Response, Router } from "express";
import { addBussiness, addWorker,getAvailableTimes, logIn } from "../controllers/bussiness";

const router = Router();

router.post("/", (req: Request, res: Response) => {
    addBussiness(req, res);
});

router.get("/login", (req, res) => {
    logIn(req, res);
});

router.patch("/setting/addWorker/:id", (req, res) => {
    addWorker(req, res);
})

router.get("/:id",(req,res)=>{
    getAvailableTimes(req,res);
})




export default router
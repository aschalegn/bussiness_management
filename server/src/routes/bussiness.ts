import { Request, Response, Router } from "express";
import { addBussiness, logIn } from "../controllers/bussiness";
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

router.patch("/setting/:id",()=>{
    
})






export default router
import { Request, Response } from 'express';
import mongoose from 'mongoose'
import bcrypt from "bcryptjs";
import { Business } from '../model/Bussiness';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';

const addBussiness = async (req: Request, res: Response) => {
    const body = req.body;
    const emailExist = await isEmailExists(body.email);
    if (!emailExist) {
        body.phones = [body.phone];
        body.password = hashPassword(body.password);
        const newBussiness = new Business(body);
        await newBussiness.save();
        return res.status(201).send(newBussiness);
    }
    return res.status(300).send("This Email exists in the system");
}

const logIn = async (req: Request, res: Response) => {
    const { email, password } = req.query;
    const business = await Business.findOne({ email });
    if (await business) {
        const isPasswordMatch = comparePassword(password, business.password);
        if (isPasswordMatch) {
            return res.status(200).send("logedIn successfully");
        }
        return res.status(500).send("password does not match");
    }
    return res.status(500).send("could not find the user");
}

const addWorker = async (req: Request, res: Response) => {
    const worker = req.body;
    const availableTimes = addSetAvailable(worker)
    worker.availableTimes = availableTimes;
    const { id } = req.params;
    worker.id = uuidv4();

    Business.findById(id, (err: any, b: any) => {
        if (err) { console.log(err); }
        b.workers.push(worker)
        b.save();
        return res.status(200).send(worker)
    })
}



// * Util Functions
async function isEmailExists(email: string): Promise<Boolean> {
    const isFound = await Business.findOne({ email });
    if (await isFound) return true;
    return false;
}

function hashPassword(password: string): String {
    const hash = bcrypt.hashSync(password, 10);
    return hash;
}

function comparePassword(password: any, hash: string): boolean {
    const isMatch = bcrypt.compareSync(password, hash);
    return isMatch;
}

function tokenise() { }


const addSetAvailable = (worker: any) => {
    const jump = worker.jump
    const start = moment(worker.openAt, "kk:mm")
    const end = moment(worker.closeAt, "kk:mm")
    const timesBetween = [];
    // clone to add new object
    while (start < end) {
        timesBetween.push(start.clone().format("kk:mm"))
        start.add(jump, "m");
    }
    return timesBetween
}

export { addBussiness, logIn, addWorker };

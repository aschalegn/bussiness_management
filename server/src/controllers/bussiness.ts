import { Request, Response } from 'express';
import bcrypt from "bcryptjs";
import { Business } from '../model/Bussiness';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import { tokenise } from '../util';

const addBussiness = async (req: Request, res: Response) => {
    const body = req.body;
    const emailExist = await isEmailExists(body.email);
    if (!emailExist) {
        body.phones = [body.phone];
        body.password = hashPassword(body.password);
        const newBussiness = new Business(body);
        await newBussiness.save();
        const token = tokenise(newBussiness, "business");
        res.cookie("appointU", token);
        return res.status(201).send({ body: newBussiness, type: "business" });
    }
    return res.status(300).send("This Email exists in the system");
}


const logIn = async (email: any, password: any, res: Response) => {
    if (email) {
        const business = await Business.findOne({ email });
        if (await business) {
            const isPasswordMatch = comparePassword(password, business.password);
            if (isPasswordMatch) {
                const token = tokenise(business, "business");
                res.cookie("appointU", token);
                return res.status(200).send({ body: business, type: "business" });
            }
            return res.status(500).send("password does not match");
        }
        return res.status(500).send("could not find the user");
    }
}

const addWorker = async (req: Request, res: Response) => {
    const worker = req.body;
    const availableTimes = addSetAvailable(worker)
    worker.availableTimes = availableTimes;
    const { id } = req.params;
    worker.id = uuidv4();

    Business.findById(id, (err: any, b: any) => {
        if (err) { console.log(err); }
        
        
        b.workers.push(worker);
        
        b.save();
        // console.log(b);
        
        return res.status(200).send(worker)
    })
}

const getAvailableTimes = (req: Request, res: Response) => {
    const { id } = req.params;
    return Business.findById(id)
        .then((data: any) => {
            // res.status(200).send(data.workers);
            console.log(data);
            
        })
        .catch((err: any) => {
            console.log(err);
            res.status(500);
        })
}

async function updatePassword(email: string, password: string) {
    const business = await Business.findOne({ email });
    if (await business) {
        const hash = hashPassword(password);
        business.password = hash;
        business.save();
        return true;
    }
    return false;
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



export { addBussiness, logIn, addWorker, getAvailableTimes, updatePassword };

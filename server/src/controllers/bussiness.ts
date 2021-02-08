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

    const {id} = req.params;
    
    // ! generate id with uuid;
    worker.id = uuidv4();
    // console.log(worker);
    Business.findById(id , (err:any,b:any)=>{
        if (err) {
            console.log(err);
        }

        
         b.workers.push(worker)
         b.save();
         console.log(b);
         return res.status(200).send(worker)
    })
    // TODO: push inoto the clients array of the business using the business id from the url;
    // const worker = new Business( body );
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
    console.log(worker);
    
        const jump = worker.jump
        const startTime = moment(worker.openAt, "kk:mm").format("kk:mm")
        const endTime = moment(worker.closeAt, "kk:mm").format("kk:mm")
        const start = moment(worker.openAt, "kk:mm")
        const end = moment(worker.closeAt, "kk:mm")
        const timesBetween = [];
    
        while (start < end) {
            timesBetween.push(start.clone().format("kk:mm"))// clone to add new object
            start.add(jump, "m");
        }
    // console.log(data,'datttta-----------');
    
    
        return timesBetween
        // console.log(timesBetween);
        
    }

export { addBussiness, logIn, addWorker };

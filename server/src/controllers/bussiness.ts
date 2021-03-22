import { Request, Response } from 'express';
import bcrypt from "bcryptjs";
import { Business } from '../model/Bussiness';
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
        const token = tokenise(newBussiness._id, "business");
        res.cookie("appointU", token);
        return res.status(201).send({ body: newBussiness, type: "business" });
    }
    return res.status(300).send("This Email exists in the system");
}

const logIn = async (email: any, password: any, res: Response) => {
    if (email) {
        const business = await Business.find({ $or: [{ email: email }, { "workers.email": email }] }).select("-appointments");
        if (await business) {
            let b = business[0]
            if (b.email === email) {
                const isPasswordMatch = comparePassword(password, b.password);
                if (isPasswordMatch) {
                    const token = tokenise(b._id, "business");
                    res.cookie("appointU", token);
                    return res.status(200).send({ body: b, type: "business" });
                }
            }
            else {
                const worker = b.workers.find((w: any) => w.email === email);
                const isPasswordMatch = comparePassword(password, worker.password);
                if (isPasswordMatch) {
                    const token = tokenise(b._id, "business");
                    res.cookie("appointU", token);
                    console.log(worker);
                    return res.status(200).send({ body: worker, type: "business" });
                }
            }
            return res.status(500).send("password does not match");
        }
        return res.status(500).send("could not find the user");
    }
}

const addWorker = async (req: Request, res: Response) => {
    const worker = req.body;
    const emailExist = await isEmailExists(worker.email);
    if (!emailExist) {
        worker.password = hashPassword(worker.password);
        worker.times = {
            openAt: worker.openAt,
            closeAt: worker.closeAt,
            jump: worker.jump
        }
        const availableTimes = addSetAvailable(worker)
        worker.availableTimes = availableTimes;
        const { id } = req.params;

        Business.findById(id, (err: any, b: any) => {
            if (err) { console.log(err); }
            b.workers.push(worker);
            b.save();
            return res.status(200).send(worker)
        });
    };
};

const getAvailableTimes = (req: Request, res: Response) => {
    const { id } = req.params;
    return Business.findById(id)
        .then((data: any) => {
            res.status(200).send(data.workers);
        })
        .catch((err: any) => {
            console.log(err);
            res.status(500);
        });
};

const updateDetails = async (id: string, body: any) => {
    console.log(body);
    const updated = await Business.findByIdAndUpdate(id, body, { new: true });
    if (await updated) {
        return updated;
    }
    return false;
};

async function updatePassword(email: string, password: string) {
    const business = await Business.findOne({ email });
    if (await business) {
        const hash = hashPassword(password);
        business.password = hash;
        business.save();
        return true;
    };
    return false;
};

// * Util Functions
async function isEmailExists(email: string): Promise<Boolean> {
    const isFound = await Business.findOne({ email });
    if (await isFound) return true;
    return false;
};

function hashPassword(password: string): String {
    const hash = bcrypt.hashSync(password, 10);
    return hash;
};

function comparePassword(password: any, hash: string): boolean {
    const isMatch = bcrypt.compareSync(password, hash);
    return isMatch;
};

const addSetAvailable = (worker: any) => {
    const jump = worker.jump
    const start = moment(worker.openAt, "kk:mm")
    const end = moment(worker.closeAt, "kk:mm")
    const timesBetween = [];
    // clone to add new object
    while (start < end) {
        timesBetween.push(start.clone().format("kk:mm"))
        start.add(jump, "m");
    };
    return timesBetween;
};

const addService = async (businessId: string, body: IService, file: Express.MulterS3.File) => {
    const business = await Business.findById(businessId);
    console.log(body);
    body.img = file.location;
    business.services.push(body);
    await business.save();
    return business.services;
};

export { addBussiness, logIn, addWorker, getAvailableTimes, updatePassword, updateDetails, addService };

import { Request, Response } from 'express';
import bcrypt from "bcryptjs";
import { Business } from '../model/Bussiness';



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
        if (isPasswordMatch)
            return res.status(200).send("logedIn successfully");
        return res.status(500).send("password does not match");
    }
    return res.status(500).send("could not find the user");
}

const addWorker = async(req: Request, res: Response) => {

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



export { addBussiness, logIn, addWorker };
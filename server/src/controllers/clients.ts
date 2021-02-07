// const Client = require("../model/Client");
import { Business } from '../model/Bussiness';
import { Client } from '../model/Client'

function register(req: any, res: any, next: any) {
    const { fullName, phone } = req.body;
    const { businessID } = req.params;

    const user = new Client({
        fullName,
        phone,
        businessID
    });

    Client.findOne({ phone }, function (err: any, u: any) {
        // error occur
        if (err) {
            console.log({ msg: err.message });
            return res.status(500).send({ msg: err.message });
        }
        // if phone is exist into database i.e. phone is associated with another user.
        if (u) {
            console.log({ msg: 'This phone address is already associated with another account.' });
            return res.status(400).send({ msg: 'This phone address is already associated with another account.' });
        }
        // if user is not exist into database then save the user into database for register account
        Business.findById(businessID, (err: any, bussiness: any) => {
            if (err) {
                console.log({ msg: err.message });
                return res.status(500).send({ msg: err.message });
            }
            if (!bussiness) {
                // return res.
            }
            user.save();
            bussiness.clients.push(user);
            return res.status(201).send(user);
        });
    });
}

function login(req: any, res: any, next: any) {
    const { phone } = req.body;
    Client.findOne({ phone: phone }, function (err: any, user: any) {
        if (err) return res.status(500).send({ msg: err.message });
        // user is not found in database i.e. user is not registered yet.
        else if (!user)
            return res.status(401).send({ msg: 'The phone number ' + phone + ' is not associated with any account. please check and try again!' });
        // user successfully logged in
        return res.status(200).send('User successfully logged in.');
    });
}

export { register, login };
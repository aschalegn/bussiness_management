import { ObjectId } from 'mongoose';
import { IBusiness } from '../interfaces/Business';
import { Business } from '../model/Bussiness';
import { Client } from '../model/Client'
import { tokenise } from '../util';

function register(req: any, res: any, next: any) {
    const { fullName, phone } = req.body;
    const { businessId } = req.params;
    Client.findOne({ phone }, function (err: any, u: any) {
        if (err) {
            return res.status(500).send({ msg: err.message });
        }
        if (u) {
            return res.status(400).send({ msg: 'This phone address is already associated with another account.' });
        }
        Business.findById(businessId, async (err: any, business: IBusiness) => {
            if (err) {
                return res.status(500).send({ msg: err.message });
            }
            if (!business) {
                return
            }
    

            const user = new Client({ fullName, phone });
            if (user) {
                user.businesses.push(business._id);
                business.clients.push(user._id);
                await user.save();
                await business.save();
                const token = tokenise(user._id, "client");
                res.cookie("appointU", token);
                return res.status(201).send({ body: user, type: "client", business: businessId });
            }
            return res.status(500).send("omkjhgghbj");
        });
    });
}

function login(req: any, res: any, next: any) {
    const { phone, businessId } = req.query;
    Client.findOne({ phone: phone }, function (err: any, user: any) {
        if (err) return res.status(500).send({ msg: err.message });
        else if (user) {
            const token = tokenise(user._id, "client");
            res.cookie("appointU", token);
            return res.status(200).send({ body: user, type: "client", business: businessId });
        }
        return res.status(401).send({ msg: 'The phone number ' + phone + ' is not associated with any account. please check and try again!' });
    });
}

const deleteClient = (id: ObjectId) => { }


export { register, login };
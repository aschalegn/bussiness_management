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
        Business.findById(businessId, async (err: any, business: any) => {
            if (err) {
                return res.status(500).send({ msg: err.message });
            }
            if (!business) {
            }
            const user = new Client({ fullName, phone });
            await user.save();
            if (user) {
                user.businesses.push(business);
                business.clients.push(user);
                business.save();
                user.save();
            }
            const token = tokenise(user, "client");
            res.cookie("appointU", token);
            return res.status(201).send(user);
        });
    });
}

function login(req: any, res: any, next: any) {
    const { phone } = req.query;
    Client.findOne({ phone: phone }, function (err: any, user: any) {
        if (err) return res.status(500).send({ msg: err.message });
        else if (!user)
            return res.status(401).send({ msg: 'The phone number ' + phone + ' is not associated with any account. please check and try again!' });
        // user successfully logged in
        const token = tokenise(user, "client");
        res.cookie("appointU", token);
        return res.status(200).send('User successfully logged in.');
    });
}

export { register, login };
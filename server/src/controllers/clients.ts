// const Client = require("../model/Client");
import { Client } from '../model/Client'

function register(req: any, res: any, next: any) {
    const { fullName, phone } = req.body;

    const user = new Client({
        fullName,
        phone,
        businessID: '12345678cgvhbnlkbjn'
    });

    Client.findOne({ phone }, function (err: any, u: any) {
        // error occur
        if (err) {
            console.log({msg: err.message});
            
            return res.status(500).send({ msg: err.message });
        }
        // if phone is exist into database i.e. phone is associated with another user.
        else if (u) { 
            console.log({msg: 'This phone address is already associated with another account.'});
            return res.status(400).send({ msg: 'This phone address is already associated with another account.' });
           
            
        }
            // if user is not exist into database then save the user into database for register account
        else{
            user.save();
            console.log(user,' user saved in database');
        }
    })
        // .then((userData: any) => {

        //     if (!userData) {
        //         user.save();
        //         console.log(user, userData, 'userData');

        //     } else {
        //         res.status(404).json({ error: 'User already exist' })
        //     }
        // })
        // .catch((err: any) => {
        //     res.status(500).send('error:' + err)
        // })
}

function login(req: any, res: any, next: any) {
    const { phone } = req.body;
    Client.findOne({ phone: phone }, function (err: any, user: any) {
        if (err) {
            return res.status(500).send({ msg: err.message });
        }
        // user is not found in database i.e. user is not registered yet.
        else if (!user) {
            return res.status(401).send({ msg: 'The phone number ' + phone + ' is not associated with any account. please check and try again!' });
        }
        // user successfully logged in
        else {
            return res.status(200).send('User successfully logged in.');
        }
    })

}

export { register, login };
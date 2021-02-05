import { Client } from "../model/Client";

module.exports = (io: any) => {
    io.on("connection", (socket: any) => {
        socket.on("register user", (data: any) => {
            const { user, appId } = data;
            adduSer(user, appId, socket);
        });
    });
}

const adduSer = (user: any, appId: any, socket: any) => {
    Client.create(user)
        .then((user: any) => { socket.emit('user registered', user) });

}
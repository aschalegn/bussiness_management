import express from 'express';
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
    cors: {
        origin: "*",
        credentials: true
    }
});


export { io, server,app }
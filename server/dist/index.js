"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var util_1 = require("./util");
var cors_1 = __importDefault(require("cors"));
var mongoose_1 = __importDefault(require("mongoose"));
var dotenv_1 = __importDefault(require("dotenv"));
var bussiness_1 = __importDefault(require("./routes/bussiness"));
var clients_1 = __importDefault(require("./routes/clients"));
var appointment_1 = __importDefault(require("./routes/appointment"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var util_2 = require("./util");
var Email_1 = require("./eventsNotification/Email");
var eventsNotification_1 = require("./eventsNotification");
var config_1 = require("./util/config");
var Bussiness_1 = require("./model/Bussiness");
var Client_1 = require("./model/Client");
dotenv_1.default.config();
util_1.app.use(express_1.default.json());
util_1.app.use(express_1.default.urlencoded({ extended: false }));
util_1.app.use(cookie_parser_1.default());
//* Routing
util_1.app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
util_1.app.get("/test", function (req, res) {
    res.send("jkhgcfxchbjk");
});
util_1.app.use(cors_1.default({
    origin: "http://localhost:3000",
    credentials: true
}));
// Server sent events
util_1.app.get("/api/sse/:businessId", function (req, res) {
    var businessId = req.params.businessId;
    var isChanneliExists = eventsNotification_1.clients.find(function (cl) { return cl.business === businessId; });
    // console.log(isChanneliExists);
    // ! if chanell exists
    if (isChanneliExists) {
        // const isClientExists = clients[isChanneliExists].clients.find(r => {
        // return r === res;
        // });
        // if (!isClientExists) {
        // clients[isChanneliExists].clients.push(res);
        // }
    }
    // ! if business chanel not exsits
    else {
        var newChannel = { business: businessId, clients: [res] };
        eventsNotification_1.clients.push(newChannel);
    }
    res.set("Content-Type", "text/event-stream");
    res.set("Connection", "keep-alive");
    res.set("Cache-Controll", "no-cache");
    res.set("Access-Controll-Allow-Origin", "*");
    return res.status(200).end();
});
util_1.app.use("/api/business", bussiness_1.default);
util_1.app.use('/api/client', clients_1.default);
util_1.app.use('/api/appointment', appointment_1.default);
util_1.app.get("/api/isUser", util_2.parseToken, function (req, res, next) {
    var _a = res.locals.info, type = _a.type, id = _a.id;
    if (type === "business") {
        Bussiness_1.Business.findById(id).select("-appointments -password")
            .then(function (b) {
            res.status(200).send({ body: b, type: type });
        });
    }
    if (type === "client") {
        Client_1.Client.findById(id).select(" -password ")
            .populate({
            path: "businesses",
            populate: { path: "businesses" }
        })
            .then(function (c) {
            res.status(200).send({ body: c, type: type });
        });
    }
});
util_1.app.get("/api/logout", function (req, res, next) {
    res.clearCookie("appointU");
    return res.status(200).end();
});
util_1.app.get("/api/forgotPassword", function (req, res) {
    var email = req.query.email;
    Email_1.emailEmiter.emit("forgotPassword", email);
    return res.status(200).send();
});
//* DB Connection
mongoose_1.default.connect(config_1.db, {
    useFindAndModify: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
})
    .then(function (con) {
    console.log("connected to db");
}).catch(function (err) {
    console.log("error connecting to db" + err);
});
var PORT = process.env.PORT || 1000;
util_1.server.listen(PORT, function () {
    console.log("server is running on port " + PORT);
});

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
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var util_2 = require("./util");
var Email_1 = require("./eventsNotification/Email");
var config_1 = require("./util/config");
var Bussiness_1 = require("./model/Bussiness");
var Client_1 = require("./model/Client");
var bussiness_1 = __importDefault(require("./routes/bussiness"));
var clients_1 = __importDefault(require("./routes/clients"));
var appointment_1 = __importDefault(require("./routes/appointment"));
var appointmentEmitter = require("./eventsNotification/Appointments");
dotenv_1.default.config();
util_1.app.use(express_1.default.json());
util_1.app.use(express_1.default.urlencoded({ extended: false }));
util_1.app.use(cookie_parser_1.default());
util_1.app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
util_1.app.use(cors_1.default({
    origin: ["http://localhost:3000", "tor2u.com", "www.tor2u.com"],
    credentials: true
}));
var io = require("socket.io")(util_1.server, {
    cors: {
        origin: ["http://localhost:3000", "tor2u.com", "www.tor2u.com"],
        methods: ["GET", "POST"],
        allowedHeaders: ["Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"],
        credentials: true
    }
});
io.on("connection", function (socket) {
    appointmentEmitter(io, socket);
});
//* Routing
util_1.app.use("/api/business", bussiness_1.default);
util_1.app.use('/api/client', clients_1.default);
util_1.app.use('/api/appointment', appointment_1.default);
util_1.app.get("/mobile/:type/:id", function (req, res) {
    var _a = req.params, type = _a.type, id = _a.id;
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
    ;
});
util_1.app.get("/api/isuser", util_2.parseToken, function (req, res, next) {
    var _a = res.locals.info, type = _a.type, id = _a.id;
    if (type === "business") {
        Bussiness_1.Business.findById(id).select("-appointments -password")
            .then(function (b) {
            res.status(200).send({ body: b, type: type });
        });
    }
    ;
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
    else {
        res.status(500).send();
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

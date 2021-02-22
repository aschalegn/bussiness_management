"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Business = void 0;
var mongoose_1 = __importStar(require("mongoose"));
var businessSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: String,
    password: { type: String, required: true },
    services: {
        main: [],
        details: [{ name: String, price: Number }]
    },
    logo: String,
    poster: String,
    joinDate: String,
    times: { openAt: String, closeAt: String },
    phones: [],
    about: String,
    socialMedia: [{ name: String, link: String }],
    workers: [{
            times: { openAt: String, closeAt: String, jump: Number },
            availableTimes: [String],
            role: { type: String, enum: ["worker", "manager"] },
            permitions: [],
            skills: [String],
            password: String,
            phone: String,
            email: String
        }],
    appointments: [{
            type: mongoose_1.default.Types.ObjectId,
            ref: "Appointment"
        }],
    clients: [{
            type: mongoose_1.default.Types.ObjectId,
            ref: "Client"
        }],
    waitingList: [{
            client: {
                type: mongoose_1.default.Types.ObjectId,
                ref: "Client"
            },
            workerId: { type: String },
            date: String,
            time: String
        }]
});
var Business = mongoose_1.default.model('Business', businessSchema);
exports.Business = Business;

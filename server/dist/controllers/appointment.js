"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentContreller = void 0;
var Appointments_1 = require("../eventsNotification/Appointments");
var Appointment_1 = require("../model/Appointment");
var Bussiness_1 = require("../model/Bussiness");
var Client_1 = require("../model/Client");
var AppointmentContreller = /** @class */ (function () {
    function AppointmentContreller() {
        var _this = this;
        // ! non register user
        this.makeByBussines = function (bussinessId, data, clientId) { return __awaiter(_this, void 0, void 0, function () {
            var appointment, business, client;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        appointment = new Appointment_1.Appointment();
                        return [4 /*yield*/, Bussiness_1.Business.findById(bussinessId)];
                    case 1:
                        business = _a.sent();
                        return [4 /*yield*/, business];
                    case 2:
                        if (!_a.sent()) return [3 /*break*/, 5];
                        business.appointments.push(appointment);
                        client = Bussiness_1.Business.findById(clientId);
                        business.appointments.push(appointment);
                        return [4 /*yield*/, business.save()];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, client.save()];
                    case 4:
                        _a.sent();
                        return [2 /*return*/, appointment];
                    case 5: return [2 /*return*/, false];
                }
            });
        }); };
        this.makeByClient = function (bussinessId, data, userId) { return __awaiter(_this, void 0, void 0, function () {
            var appointment, client, business, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        data.client = userId;
                        console.log(data);
                        appointment = new Appointment_1.Appointment(data);
                        return [4 /*yield*/, Client_1.Client.findById(userId)];
                    case 1:
                        client = _c.sent();
                        return [4 /*yield*/, client];
                    case 2:
                        if (!_c.sent()) return [3 /*break*/, 10];
                        // console.log(client);
                        return [4 /*yield*/, client.appointments.push(appointment)];
                    case 3:
                        // console.log(client);
                        _c.sent();
                        return [4 /*yield*/, Bussiness_1.Business.findById(bussinessId)];
                    case 4:
                        business = _c.sent();
                        return [4 /*yield*/, business.appointments.push(appointment)];
                    case 5:
                        _c.sent();
                        return [4 /*yield*/, business.save()];
                    case 6:
                        _c.sent();
                        _b = (_a = console).log;
                        return [4 /*yield*/, business];
                    case 7:
                        _b.apply(_a, [_c.sent()]);
                        return [4 /*yield*/, client.save()];
                    case 8:
                        _c.sent();
                        return [4 /*yield*/, appointment.save()];
                    case 9:
                        _c.sent();
                        Appointments_1.appointmentEmitter.emit("made", bussinessId, appointment);
                        return [2 /*return*/, appointment];
                    case 10: return [2 /*return*/, false];
                }
            });
        }); };
        this.getByClient = function (userId) { return __awaiter(_this, void 0, void 0, function () {
            var client;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Client_1.Client.findById(userId)
                            .select("client")
                            .populate({
                            path: "appointments",
                            populate: { path: "appointments" }
                        })];
                    case 1:
                        client = _a.sent();
                        return [4 /*yield*/, client];
                    case 2:
                        if (_a.sent()) {
                            return [2 /*return*/, client];
                        }
                        else {
                            console.log('error get all');
                        }
                        return [2 /*return*/];
                }
            });
        }); };
        this.getByBusiness = function (userId) { return __awaiter(_this, void 0, void 0, function () {
            var business;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Bussiness_1.Business.findById(userId, {})
                            .select("appointments, workers")
                            .populate({
                            path: "appointments",
                            //  match: { date: date }
                            populate: { path: "client" }
                        })];
                    case 1:
                        business = _a.sent();
                        return [4 /*yield*/, business];
                    case 2:
                        if (_a.sent()) {
                            return [2 /*return*/, business];
                        }
                        else {
                            console.log('error get all');
                        }
                        return [2 /*return*/];
                }
            });
        }); };
        // Array<string>
        this.getByBusinessAgr = function (id, date) { return __awaiter(_this, void 0, void 0, function () {
            var business;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Bussiness_1.Business.findById(id)
                            .select("appointments")
                            .populate({
                            path: "appointments",
                            match: { date: date }
                        })];
                    case 1:
                        business = _a.sent();
                        return [2 /*return*/, business];
                }
            });
        }); };
        this.getWeekly = function (userId, date) { return __awaiter(_this, void 0, void 0, function () {
            var business;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Bussiness_1.Business.findById(userId)
                            .select("appointments")
                            .populate({
                            path: "appointments",
                            match: { date: date },
                            populate: { path: "client" }
                        })];
                    case 1:
                        business = _a.sent();
                        return [4 /*yield*/, business];
                    case 2:
                        if (_a.sent()) {
                            return [2 /*return*/, business];
                        }
                        else {
                            console.log('error get all');
                        }
                        return [2 /*return*/];
                }
            });
        }); };
        this.update = function (appointmentId, body) { return __awaiter(_this, void 0, void 0, function () {
            var appointment;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Appointment_1.Appointment.findByIdAndUpdate(appointmentId, body)];
                    case 1:
                        appointment = _a.sent();
                        console.log(appointment);
                        return [2 /*return*/, appointment];
                }
            });
        }); };
        this.delete = function (appointmentId) { return __awaiter(_this, void 0, void 0, function () {
            var appointment, client, deletefromClient, business, deletefromBusiness;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Appointment_1.Appointment.findByIdAndDelete(appointmentId)];
                    case 1:
                        appointment = _a.sent();
                        return [4 /*yield*/, appointment];
                    case 2:
                        if (!_a.sent()) return [3 /*break*/, 7];
                        console.log(appointment);
                        return [4 /*yield*/, Client_1.Client.findById(appointment.client)];
                    case 3:
                        client = _a.sent();
                        return [4 /*yield*/, client.appointments.filter(function (ap) { return ap !== appointmentId; })];
                    case 4:
                        deletefromClient = _a.sent();
                        return [4 /*yield*/, Bussiness_1.Business.findById(appointment.business)];
                    case 5:
                        business = _a.sent();
                        return [4 /*yield*/, business.appointments.filter(function (ap) { return ap !== appointmentId; })];
                    case 6:
                        deletefromBusiness = _a.sent();
                        // appointment.delete(); //? works
                        client.appointments = deletefromClient;
                        business.appointments = deletefromBusiness;
                        client.save();
                        business.save();
                        // appointmentEmitter.emit("deleted", appointmentId);
                        return [2 /*return*/, appointment];
                    case 7: return [2 /*return*/, false];
                }
            });
        }); };
    }
    return AppointmentContreller;
}());
exports.AppointmentContreller = AppointmentContreller;

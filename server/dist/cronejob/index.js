"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCronJob = exports.setSchedualForSms = void 0;
var node_cron_1 = __importDefault(require("node-cron"));
var CronJob_1 = require("../model/CronJob");
var setSchedualForSms = function (croneJob, bussinessId) {
    var _a = croneJob.cron, month = _a.month, day = _a.day, hour = _a.hour, minute = _a.minute, year = _a.year;
    node_cron_1.default.schedule("0 " + minute + " " + hour + " " + day + " " + month + " " + year, function () {
        // ! send in app notification or sms
        CronJob_1.CronJob.create.apply(CronJob_1.CronJob, __spreadArrays(croneJob, [bussinessId]));
    });
};
exports.setSchedualForSms = setSchedualForSms;
var createCronJob = function (data, businessId) {
    var month = data.month, day = data.day, hour = data.hour, minute = data.minute, year = data.year;
    var job = {
        name: "send sms",
        description: "send sms on appointment creation",
        cron: { month: month, day: day, hour: hour, minute: minute, year: year }
    };
    exports.setSchedualForSms(job, businessId);
};
exports.createCronJob = createCronJob;

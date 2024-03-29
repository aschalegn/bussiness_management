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
exports.deleteClient = exports.login = exports.register = void 0;
var Bussiness_1 = require("../model/Bussiness");
var Client_1 = require("../model/Client");
var util_1 = require("../util");
function register(req, res, next) {
    var _a = req.body, fullName = _a.fullName, phone = _a.phone;
    var businessId = req.params.businessId;
    Client_1.Client.findOne({ phone: phone }, function (err, u) {
        var _this = this;
        if (err) {
            return res.status(500).send({ msg: err.message });
        }
        ;
        if (u) {
            return res.status(400).send({ msg: 'This phone address is already associated with another account.' });
        }
        ;
        Bussiness_1.Business.findById(businessId, function (err, business) { return __awaiter(_this, void 0, void 0, function () {
            var user, token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (err) {
                            return [2 /*return*/, res.status(500).send({ msg: err.message })];
                        }
                        if (!business) {
                            return [2 /*return*/];
                        }
                        user = new Client_1.Client({ fullName: fullName, phone: phone });
                        if (!user) return [3 /*break*/, 3];
                        user.businesses.push(business._id);
                        business.clients.push(user._id);
                        return [4 /*yield*/, user.save()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, business.save()];
                    case 2:
                        _a.sent();
                        token = util_1.tokenise(user._id, "client");
                        res.cookie("appointU", token);
                        return [2 /*return*/, res.status(201).send({ body: user, type: "client", business: businessId })];
                    case 3:
                        ;
                        return [2 /*return*/, res.status(500).send("omkjhgghbj")];
                }
            });
        }); });
    });
}
exports.register = register;
;
function login(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var phone, user, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    phone = req.query.phone;
                    return [4 /*yield*/, Client_1.Client.findOne({ phone: phone }).select("-appointments")
                            .populate({
                            path: "businesses",
                            populate: { path: "businesses" }
                        })];
                case 1:
                    user = _a.sent();
                    return [4 /*yield*/, user];
                case 2:
                    if (_a.sent()) {
                        token = util_1.tokenise(user._id, "client");
                        res.cookie("appointU", token);
                        return [2 /*return*/, res.status(200).send({ body: user, type: "client" })];
                    }
                    else {
                        return [2 /*return*/, res.status(204).send({ msg: 'The phone number ' + phone + ' is not associated with any account. please check and try again!' })];
                    }
                    ;
                    return [2 /*return*/];
            }
        });
    });
}
exports.login = login;
;
var deleteClient = function (id) { };
exports.deleteClient = deleteClient;

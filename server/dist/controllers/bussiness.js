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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateDetails = exports.updatePassword = exports.getAvailableTimes = exports.addWorker = exports.logIn = exports.addBussiness = void 0;
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var Bussiness_1 = require("../model/Bussiness");
var moment_1 = __importDefault(require("moment"));
var util_1 = require("../util");
var addBussiness = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var body, emailExist, newBussiness, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                body = req.body;
                return [4 /*yield*/, isEmailExists(body.email)];
            case 1:
                emailExist = _a.sent();
                if (!!emailExist) return [3 /*break*/, 3];
                body.phones = [body.phone];
                body.password = hashPassword(body.password);
                newBussiness = new Bussiness_1.Business(body);
                return [4 /*yield*/, newBussiness.save()];
            case 2:
                _a.sent();
                token = util_1.tokenise(newBussiness._id, "business");
                res.cookie("appointU", token);
                return [2 /*return*/, res.status(201).send({ body: newBussiness, type: "business" })];
            case 3: return [2 /*return*/, res.status(300).send("This Email exists in the system")];
        }
    });
}); };
exports.addBussiness = addBussiness;
var logIn = function (email, password, res) { return __awaiter(void 0, void 0, void 0, function () {
    var business, b, isPasswordMatch, token, worker, isPasswordMatch, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!email) return [3 /*break*/, 3];
                return [4 /*yield*/, Bussiness_1.Business.find({ $or: [{ email: email }, { "workers.email": email }] }).select("-appointments")];
            case 1:
                business = _a.sent();
                return [4 /*yield*/, business];
            case 2:
                if (_a.sent()) {
                    b = business[0];
                    if (b.email === email) {
                        isPasswordMatch = comparePassword(password, b.password);
                        if (isPasswordMatch) {
                            token = util_1.tokenise(b._id, "business");
                            res.cookie("appointU", token);
                            return [2 /*return*/, res.status(200).send({ body: b, type: "business" })];
                        }
                    }
                    else {
                        worker = b.workers.find(function (w) { return w.email === email; });
                        isPasswordMatch = comparePassword(password, worker.password);
                        if (isPasswordMatch) {
                            token = util_1.tokenise(b._id, "business");
                            res.cookie("appointU", token);
                            console.log(worker);
                            return [2 /*return*/, res.status(200).send({ body: worker, type: "business" })];
                        }
                    }
                    return [2 /*return*/, res.status(500).send("password does not match")];
                }
                return [2 /*return*/, res.status(500).send("could not find the user")];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.logIn = logIn;
var addWorker = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var worker, emailExist, availableTimes, id;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                worker = req.body;
                return [4 /*yield*/, isEmailExists(worker.email)];
            case 1:
                emailExist = _a.sent();
                if (!emailExist) {
                    worker.password = hashPassword(worker.password);
                    worker.times = {
                        openAt: worker.openAt,
                        closeAt: worker.closeAt,
                        jump: worker.jump
                    };
                    availableTimes = addSetAvailable(worker);
                    worker.availableTimes = availableTimes;
                    id = req.params.id;
                    Bussiness_1.Business.findById(id, function (err, b) {
                        if (err) {
                            console.log(err);
                        }
                        b.workers.push(worker);
                        b.save();
                        return res.status(200).send(worker);
                    });
                }
                return [2 /*return*/];
        }
    });
}); };
exports.addWorker = addWorker;
var getAvailableTimes = function (req, res) {
    var id = req.params.id;
    return Bussiness_1.Business.findById(id)
        .then(function (data) {
        res.status(200).send(data.workers);
    })
        .catch(function (err) {
        console.log(err);
        res.status(500);
    });
};
exports.getAvailableTimes = getAvailableTimes;
var updateDetails = function (id, body) { return __awaiter(void 0, void 0, void 0, function () {
    var updated;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log(body);
                return [4 /*yield*/, Bussiness_1.Business.findByIdAndUpdate(id, body, { new: true })];
            case 1:
                updated = _a.sent();
                return [4 /*yield*/, updated];
            case 2:
                if (_a.sent()) {
                    return [2 /*return*/, updated];
                }
                return [2 /*return*/, false];
        }
    });
}); };
exports.updateDetails = updateDetails;
function updatePassword(email, password) {
    return __awaiter(this, void 0, void 0, function () {
        var business, hash;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Bussiness_1.Business.findOne({ email: email })];
                case 1:
                    business = _a.sent();
                    return [4 /*yield*/, business];
                case 2:
                    if (_a.sent()) {
                        hash = hashPassword(password);
                        business.password = hash;
                        business.save();
                        return [2 /*return*/, true];
                    }
                    return [2 /*return*/, false];
            }
        });
    });
}
exports.updatePassword = updatePassword;
// * Util Functions
function isEmailExists(email) {
    return __awaiter(this, void 0, void 0, function () {
        var isFound;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Bussiness_1.Business.findOne({ email: email })];
                case 1:
                    isFound = _a.sent();
                    return [4 /*yield*/, isFound];
                case 2:
                    if (_a.sent())
                        return [2 /*return*/, true];
                    return [2 /*return*/, false];
            }
        });
    });
}
function hashPassword(password) {
    var hash = bcryptjs_1.default.hashSync(password, 10);
    return hash;
}
function comparePassword(password, hash) {
    var isMatch = bcryptjs_1.default.compareSync(password, hash);
    return isMatch;
}
var addSetAvailable = function (worker) {
    var jump = worker.jump;
    var start = moment_1.default(worker.openAt, "kk:mm");
    var end = moment_1.default(worker.closeAt, "kk:mm");
    var timesBetween = [];
    // clone to add new object
    while (start < end) {
        timesBetween.push(start.clone().format("kk:mm"));
        start.add(jump, "m");
    }
    return timesBetween;
};

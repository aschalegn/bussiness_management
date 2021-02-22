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
var express_1 = require("express");
var bussiness_1 = require("../controllers/bussiness");
var images_1 = require("../controllers/images");
var Bussiness_1 = require("../model/Bussiness");
var router = express_1.Router();
router.post("/", function (req, res) {
    bussiness_1.addBussiness(req, res);
});
router.get("/login", function (req, res) {
    var _a = req.query, email = _a.email, password = _a.password;
    bussiness_1.logIn(email, password, res);
});
router.patch("/:id", function (req, res) {
    var id = req.params.id;
    var body = req.body;
    bussiness_1.updateDetails(id, body)
        .then(function (updated) {
        if (updated) {
            return res.status(200).send(updated);
        }
        return res.status(500).end();
    }).catch(function (err) {
        return res.status(500).end(err);
    });
});
router.patch("/files/:id", images_1.uploadMulter.fields([{ name: 'poster' }, { name: 'logo' }]), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var file, id, files, logo, poster, business, logoUrl, posterUrl;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                file = [];
                id = req.params.id;
                files = req.files;
                logo = files.logo, poster = files.poster;
                return [4 /*yield*/, Bussiness_1.Business.findById(id)];
            case 1:
                business = _a.sent();
                return [4 /*yield*/, business];
            case 2:
                if (_a.sent()) {
                    logoUrl = logo[0].location;
                    if (logoUrl) {
                        business.logo = logoUrl;
                    }
                    posterUrl = poster[0].location;
                    if (posterUrl) {
                        business.poster = posterUrl;
                    }
                    business.save();
                }
                res.send(files);
                return [2 /*return*/];
        }
    });
}); });
router.patch("/setting/addWorker/:id", function (req, res) {
    bussiness_1.addWorker(req, res);
});
router.get("/:id", function (req, res) {
    bussiness_1.getAvailableTimes(req, res);
});
router.patch("/updatePassword", function (req, res) {
    var _a = req.body, email = _a.email, password = _a.password;
    bussiness_1.updatePassword(email, password)
        .then(function (isUpdated) {
        if (isUpdated)
            return res.status(200).send(true);
        return res.status(500).send(false);
    });
});
exports.default = router;

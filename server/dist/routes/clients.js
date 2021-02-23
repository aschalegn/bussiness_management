"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = express_1.Router();
var clients_1 = require("../controllers/clients");
router.post('/signUp/:businessId', function (req, res, next) {
    clients_1.register(req, res, next);
});
router.get('/signIn/:businessId', function (req, res, next) {
    clients_1.login(req, res, next);
});
exports.default = router;

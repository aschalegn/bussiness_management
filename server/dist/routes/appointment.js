"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var appointment_1 = require("../controllers/appointment");
var router = express_1.Router();
router.get("/client/:userId", function (req, res) {
    var userId = req.params.userId;
    new appointment_1.AppointmentContreller()
        .getByClient(userId)
        .then(function (appointments) {
        if (appointments) {
            res.status(200).send(appointments);
        }
    }).catch(function (err) {
        console.log(err);
    });
});
router.get("/business/:id", function (req, res) {
    var id = req.params.id;
    new appointment_1.AppointmentContreller()
        .getByBusiness(id)
        .then(function (appointments) {
        if (appointments) {
            res.status(200).send(appointments);
        }
    }).catch(function (err) {
        console.log(err);
    });
});
router.post("/:bussinessId/:userId", function (req, res) {
    var body = req.body;
    var _a = req.params, bussinessId = _a.bussinessId, userId = _a.userId;
    new appointment_1.AppointmentContreller()
        .makeByClient(bussinessId, body, userId)
        .then(function (appointment) {
        if (appointment)
            return res.status(201).send(appointment);
    }).catch(function (err) {
        console.log(err, 'error');
        return res.status(500).send("didnot add");
    });
});
router.patch("/:id", function (req, res) {
    var id = req.params.id;
    var body = req.body;
    new appointment_1.AppointmentContreller()
        .update(id, body)
        .then(function (appointment) {
        if (appointment) {
            console.log('success');
            res.send(appointment);
        }
    });
    return res.status(500).send("issues while updaying the appointment");
});
router.delete("/:id", function (req, res) {
    var id = req.params.id;
    new appointment_1.AppointmentContreller()
        .delete(id)
        .then(function (appointment) {
        // if (appointment) return res.status(200).send("deleted sucssesfully");
    });
    // return res.status(500).send("issues while deleting the appointment");
});
exports.default = router;

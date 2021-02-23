"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = exports.server = exports.io = void 0;
var express_1 = __importDefault(require("express"));
var app = express_1.default();
exports.app = app;
var server = require("http").createServer(app);
exports.server = server;
var io = require("socket.io")(server, {
    cors: {
        origin: "*",
        credentials: true
    }
});
exports.io = io;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const { addUser, removeUser } = require("../helper-functions");
const router = express.Router();
const joinRoute = express.Router();
const roomInviteRoute = express.Router();
const roomsRoute = express.Router();
// const {connectDB} = require('../config/connectDB')
router.get("/", (req, res, next) => {
    res.send("Hello Hackers");
    next();
    // connectDB()
});
joinRoute.post("/join", (req, res, next) => {
    res.send("Still in development");
});
roomInviteRoute.get("/room-invite", (req, res, next) => {
    res.send("Invite link");
    next();
}); // Generate room invite link, and send to the client side
roomsRoute.get("/rooms/:room", (req, res, next) => {
    res.json({ room: req.params.room });
    next();
});
module.exports = {
    joinRoute,
    roomInviteRoute,
    roomsRoute,
    router,
};

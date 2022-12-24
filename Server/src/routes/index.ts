import express, { NextFunction, Response, Request } from "express";
const { addUser, removeUser } = require("../helper-functions");
const router = express.Router()
const joinRoute = express.Router();
const roomInviteRoute = express.Router();
const roomsRoute = express.Router();
// const {connectDB} = require('../config/connectDB')
router.get('/',(req: Request, res: Response, next: NextFunction) => {
    res.send("Hello Hackers")
    res.header('Access-Control-Allow-Origin', '0.0.0.0');
    // connectDB()
})

joinRoute.post(
  "/join",
  (req: Request, res: Response, next: NextFunction) => {
    res.send("Still in development")
  }
);

roomInviteRoute.get(
  "/room-invite",
  (req: Request, res: Response, next: NextFunction) => {
    res.send("Invite link");
    next();
  }
); // Generate room invite link, and send to the client side

roomsRoute.get(
  "/rooms/:room",
  (req: Request, res: Response, next: NextFunction) => {
    res.json({ room: req.params.room });
    next();
  }
);

module.exports = {
  joinRoute,
  roomInviteRoute,
  roomsRoute,
  router
};

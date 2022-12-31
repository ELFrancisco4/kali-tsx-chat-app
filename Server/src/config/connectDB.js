"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const connectDB = async () => {
    // try {
    //   const conn = await mongoose.connect(process.env.MONGO_URI as string);
    //   console.log(`MongoDB connected ${conn.connection.host}`);
    // } catch (error) {
    //   console.log(error);
    //   process.exit(1);
    // }
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    if (conn) {
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    }
    else {
        console.log("Error connecting to db");
    }
};
const UserSchema = new mongoose.Schema({
    name: String,
    rooms: Array,
});
const UserModel = mongoose.model("User", UserSchema);
const harry = new UserModel({
    name: "harry",
    rooms: ["hackers", "IT", "football"],
});
harry.save((err, data) => {
    err ? console.log(err) : console.log(data);
});
module.exports = {
    connectDB,
};

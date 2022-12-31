import * as dotenv from "dotenv";
import * as express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import * as cors from "cors";

const {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
} = require("./helper-functions");

interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
}

interface ClientToServerEvents {
  hello: () => void;
}

interface InterServerEvents {
  ping: () => void;
}

interface SocketData {
  name: string;
  room: number;
}

const app = express();
const httpServer = createServer(app);
const io: Server = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    optionsSuccessStatus: 200,
  },
});
const { router } = require("./routes/index");

dotenv.config();

app.use(
  cors({
    origin: "*",
    optionsSuccessStatus: 200,
  })
);
app.use(router);

const PORT = process.env.PORT || 5000;

io.on("connection", (socket) => {
  console.log(`We have a new connection!`);

  socket.on("join", ({ name, room }, callback) => {
    // Create and Add user to Database

    const { error, user } = addUser({ id: socket.id, name, room }); // Define a new user from socket instance

    if (error) {
      return callback(error);
    } // Throw an error
    else socket.join(user!.room); // Add new socket to room

    socket.emit("message", {
      user: "admin",
      text: `Welcome to the chat ${user!.name}`,
    }); // Send message to chat when a new user joins
    socket.broadcast.to(user!.room).emit("message", {
      user: "admin",
      text: `A wild ${user!.name} has appeared`,
    }); // Send message to all other users in room except new user
    io.to(user!.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });
    return callback();
  }); // Get user data from specific room

  socket.on("chat message", async (message, callback) => {
    const user = getUser(socket.id);
    await io.to(user.room).emit("message", { user: user.name, text: message });
    await io.to(user!.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });
    return callback();
    // Store message in database
  });

  socket.emit("onlineStatus", (users: any, callback: any) => {
      return callback(users) // Set the number of people online in a room
  })

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);
    try {
      if (user) {
        io.to(user.room).emit(`User ${user.name} has left`);
      }
    } catch (error) {
      console.log(error);
      console.log("Something went wrong!");
    }
  });
});

httpServer.listen(PORT, () => {
  console.log(`Server is listening on PORT ${PORT}`);
});

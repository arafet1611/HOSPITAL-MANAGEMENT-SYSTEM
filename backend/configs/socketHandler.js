// configs/socketHandler.js
import { Server } from "socket.io";

let io;

export const initSocketIO = (httpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:5173",
    },
  });

  io.on("connection", (socket) => {
    console.log("New client connected");
    socket.emit("notification", { message: "New notification!" });
  });
};

export const getIoInstance = () => io;

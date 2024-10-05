import express from "express";
import serverConfig from "./config/serverConfig.js";
import prisma from "./config/prismaConfig.js";
import { Server } from "socket.io";
import http from "http";
import cors from "cors";
import cookieParser from "cookie-parser";

// Routes
import roomRoutes from "./routes/roomRoutes.js";

//Handlers
import roomHandler from "./handlers/roomHandler.js";

const app = express();

const corsOptions = {
  credentials: true,
  origin: process.env.FRONTEND_URL,
};

const server = http.createServer(app);

// Socket.io setup
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("New user connected");

  //Handlers
  roomHandler(io, socket);
  
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

// Routes
app.use("/api/room", roomRoutes);

server.listen(serverConfig.PORT, () => {
  console.log(`Server is up at port ${serverConfig.PORT}`);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

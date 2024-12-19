import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import errorHandler from "./middleware/error/errorHandler.js";
import festivalRouter from "./router/festivalRouter.js";
import participationRouter from "./router/participationRouter.js";
import userRouter from "./router/userRouter.js";
import boardRouter from "./router/boardRouter.js";
import boothRouter from "./router/boothRouter.js";
import noticeRouter from "./router/noticeRouter.js";
import commentRouter from "./router/commentRouter.js";
import wishlistRouter from "./router/wishlistRouter.js";
import payRouter from "./router/payRouter.js";
import notificationRouter from "./router/notificationRouter.js";
import reviewRouter from "./router/reviewRouter.js";
import menuRouter from "./router/menuRouter.js";
import { createServer } from "http";
import { Server } from "socket.io";

dotenv.config();
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("authenticate", (userId) => {
    socket.join(`user_${userId}`);
  });
});

export const sendNotification = (userId, notification) => {
  io.to(`user_${userId}`).emit("new_notification", notification);
};

app.use(express.json());
const allowedOrigins = ["http://localhost:3000"];
const corsOptions = {
  credentials: true,
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, origin); // 허용
    } else {
      callback(new Error("Not allowed by CORS")); // 허용하지 않음
    }
  },
  exposedHeaders: ["set-cookie"],
};

app.use(cors(corsOptions));

app.use("/festival", festivalRouter);
app.use("/participation", participationRouter);
app.use("/user", userRouter);
app.use("/board", boardRouter);
app.use("/booth", boothRouter);
app.use("/notice", noticeRouter);
app.use("/comment", commentRouter);
app.use("/wishlist", wishlistRouter);
app.use("/pay", payRouter);
app.use("/notification", notificationRouter);
app.use("/review", reviewRouter);
app.use("/menu", menuRouter);

app.use(errorHandler);

httpServer.listen(3001);

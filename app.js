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
// import payRouter from "./router/payRouter.js";
import notificationRouter from "./router/notificationRouter.js";
import reviewRouter from "./router/reviewRouter.js";
import menuRouter from "./router/menuRouter.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["set-cookie"],
  })
);

app.use("/festival", festivalRouter);
app.use("/participation", participationRouter);
app.use("/user", userRouter);
app.use("/board", boardRouter);
app.use("/booth", boothRouter);
app.use("/notice", noticeRouter);
app.use("/comment", commentRouter);
app.use("/wishlist", wishlistRouter);
// app.use("/pay", payRouter);
app.use("/notification", notificationRouter);
app.use("/review", reviewRouter);
app.use("/menu", menuRouter);

app.use(errorHandler);

app.listen(3001, () => console.log("http://localhost:3001"));

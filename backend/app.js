import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./routes/user.route.js";
import taskRouter from "./routes/task.route.js";
dotenv.config({ path: "./.env" });

const app = express();

app.use(
   cors({
      origin: [
         `${process.env.CLIENT_DOMAIN}`,
         "http://localhost:5173",
         "http://localhost:4173",
      ],
      credentials: true,
   })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

// Routes
app.use("/api/auth", userRouter);
app.use("/api/task", taskRouter);

export default app;

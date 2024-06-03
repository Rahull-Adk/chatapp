import express from "express";
import dotenv from "dotenv";
import userRouter from "./src/routes/user.routes.js";
import cookieParser from "cookie-parser";
dotenv.config({ path: "./.env" });

const app = express();

app.use(cookieParser());
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use("/api/v1/users/", userRouter);

export { app };

import express, { json } from "express";
import dotenv from "dotenv";
import { connectDB } from "./db/db";
import todoRouter from "./routes/todoRouter";
import userRouter from "./routes/userRouter";
import cors from "cors";
import errorHandler from "./middlewares/errorHandler";
import cookieParser from "cookie-parser";

dotenv.config({
    path: ".env"
});

const app = express();

const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(json());
app.use(cookieParser());
app.use(errorHandler);

app.use("/api/todos", todoRouter);
app.use("/api/users", userRouter); // Added the base path for user routes

app.listen(PORT, ()=> {
    connectDB();
    console.log(`Server running on port ${PORT}`)
});
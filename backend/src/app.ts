import express from "express";
import { config } from "dotenv";
import appRouter from "./routes/index.js";
import cookieParser from "cookie-parser";
import cors from "cors";
config();
const app = express();

//middlewares
app.use(cors({ 
  origin: process.env.FRONTEND_URL || "http://localhost:5173", 
  credentials: true 
}));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

app.get("/api", (req, res) => {
  res.json({ message: "Welcome to the LB-101 Form API" });
});

app.use("/api/v1", appRouter);

export default app;
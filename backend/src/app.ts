import express from "express";
import { config } from "dotenv";
import appRouter from "./routes/index.js";
import cookieParser from "cookie-parser";
import cors from "cors";
config();
const app = express();

//middlewares
app.use(cors({ 
  origin: "https://lb-101-form-app-frontend.vercel.app", 
  credentials: true 
}));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

app.get("/api", (req, res) => {
  res.json({ message: "Welcome to the LB-101 Form API" });
});

app.use("/api/v1", appRouter);

export default app;
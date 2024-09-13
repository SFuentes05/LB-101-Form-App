import express from "express";
import { config } from "dotenv";
import appRouter from "./routes/index.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectToDatabase } from "./db/connection.js";

config();
const app = express();

// Middlewares
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

const PORT = process.env.PORT || 5000;

connectToDatabase().then(() => {
    app.listen(PORT, () =>
    console.log(`Server open & connected to database on port ${PORT}`)
    );
})
.catch(err => console.log(err));

export default app;
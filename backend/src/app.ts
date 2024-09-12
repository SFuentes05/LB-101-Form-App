import express from "express";
import { config } from "dotenv";
import appRouter from "./routes/index.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from 'path';
import { fileURLToPath } from 'url';

config();
const app = express();

const corsOrigin = process.env.NODE_ENV === 'production' ? false : "http://localhost:3001";

//middlewares
app.use(cors({ origin: corsOrigin, credentials: true }));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use("/api/v1", appRouter);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, '../../frontend/dist')));

// Anything that doesn't match the above, send back index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'));
});

export default app;
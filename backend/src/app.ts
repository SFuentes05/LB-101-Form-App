import express from "express";
import { config } from "dotenv";
import appRouter from "./routes/index.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser";
import path from 'path';
import { fileURLToPath } from 'url';

config();
const app = express();

//middlewares
app.use(cors({ origin: process.env.API_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: true }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// API routes
app.use("/api/v1", appRouter);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../../frontend/dist')));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'));
});

export default app;
import express from "express";
import { config } from "dotenv";
import appRouter from "./routes/index.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser";
config();
const app = express();

//middlewares
app.use(cors({ origin: "https://latambioenergy101form-g4hvexfcazhrasf9.eastus-01.azurewebsites.net", credentials: true }));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: true }));

app.use("/api/v1", appRouter);

export default app;
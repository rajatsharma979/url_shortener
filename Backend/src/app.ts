import express from "express";
import mongoose from "mongoose";
import useragent from "express-useragent";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

import urlRoutes from "./routes/url_routes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import authRoutes from "./routes/authenticationRoutes.js";

dotenv.config();
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true               // allow cookies
}));

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(useragent.express());
app.use(cookieParser());

app.use(authRoutes);
app.use(urlRoutes);
app.use(dashboardRoutes);

mongoose.connect(process.env.DB_LINK!)
.then(()=>{
    app.listen(process.env.PORT!, ()=>{
        console.log(`Server is listening at ${process.env.PORT!}...`);
    })
})
.catch((err) => {
    console.log("Error initiating server", err);
})

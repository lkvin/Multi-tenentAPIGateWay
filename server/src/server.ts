import express from "express";
import type { Express } from "express";
import { authRoute } from "./routes/auth.route.js";



const app:Express = express();

app.use(express.json());
app.use("/api/auth",authRoute);

export {app};


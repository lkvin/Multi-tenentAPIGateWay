import express from "express";
import type { Express } from "express";
import { authRoute } from "./routes/auth.route.js";
import { apiRoute } from "./routes/api.route.js";



const app:Express = express();

app.use(express.json());
app.use("/api/auth",authRoute);
app.use("/api",apiRoute)

export {app};


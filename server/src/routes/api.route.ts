import express, { Router } from "express";
import { authenticateUser } from "../middleware/auth.js";
import { reqAPIKey } from "../controllers/api.controller.js";

const apiRoute : Router = express.Router();

apiRoute.post("/keys",authenticateUser,reqAPIKey);

export {apiRoute};
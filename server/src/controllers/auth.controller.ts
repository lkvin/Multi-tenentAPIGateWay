import type { Request, Response } from "express";
import {registerUser} from "../services/auth.service.js";


export const register = async (req: Request, res: Response) => {
    try {
        const result = await registerUser(req.body);


        res.status(201).json(result)
    } catch (error: any) {
        console.log(error);

        res.status(400).json(error.message);
    }
}

export const login = async (req: Request, res: Response) => {
  
}

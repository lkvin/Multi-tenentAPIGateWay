import type { Request, Response } from "express";
import { loginUser, registerUser } from "../services/auth.services.js";


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
    try {
        const result = await loginUser(req.body);
        res.status(200).json(result)
    } catch (error: any) {
        res.status(404).json(error.message)
    }
}

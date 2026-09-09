import type { Request, Response } from "express";


export const reqAPIKey = async (req: Request,res:Response) =>{
    try{
        console.log(req.user);
        res.json({message:"this  is for testing"})
    }catch{

    }
}
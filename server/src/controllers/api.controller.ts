import type { Request, Response } from "express";
import { genUserKey } from "../services/api.services.js";



export const reqAPIKey = async (req: Request,res:Response) =>{
    try{
        const user = req.user;
        const name = req.body.name;
        const payloadForAPI = {
            userId : user?.userId!,
            name : name
        }
        const APIKey = await genUserKey(payloadForAPI);
        console.log(APIKey);
        res.status(200).json({"apiKey" : APIKey})
    }catch(error : any){
        res.status(404).json(error.message)
    }
}
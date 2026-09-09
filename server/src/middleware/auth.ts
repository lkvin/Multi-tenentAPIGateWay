import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config"
import { prisma } from "../config/db.js";

type decodedUser = {
    userId : string
    email : string
}


export const authenticateUser = async (req:Request,res:Response,next:NextFunction) =>{
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    const JWTSecret = process.env.JWT_SECRET
    if(!token){
        return res.status(401).json({error: 'Access denied! No token provided'})
    }
    try {
        const decoded = jwt.verify(token,JWTSecret!) as decodedUser;

        const user = await prisma.user.findUnique({where:{id:decoded.userId}})


        if(!user){
           return res.status(404).json({error : "User not found"})
        }

        req.user = {
            userId : user.id,
            email : user.email
        }
        next()


    } catch (error) {
        return res.status(500).json({error: error})
    }
}
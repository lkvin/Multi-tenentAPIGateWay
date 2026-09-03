import { prisma } from "../config/db.js";
import bcrypt from 'bcryptjs';
import type { User } from "../generated/prisma/client.js";
import jwt from "jsonwebtoken";
import "dotenv/config"
import type { userRespond } from "../types/users.type.js";



type userPayload ={
    email : string,
    password : string
}
type genTokenPayload ={
    userId: string,
    email: string
}

export const findUserByEmail = async (emailPayload : string) : Promise <User | null> =>{
    return prisma.user.findUnique({where:{email:emailPayload}});
}

export const verifyPassword = async (password : string,hash : string) :Promise<Boolean> =>{
    return bcrypt.compare(password,hash);
}

export const genToken = async (payload : genTokenPayload) :Promise <string>=>{
    const JWT_SECRET = process.env.JWT_SECRET;
    return jwt.sign(payload,JWT_SECRET!);
}
export const registerUser = async (payload : userPayload) : Promise <userRespond> =>{

    const existedUser = await prisma.user.findUnique({where:{email:payload.email}})
    if(existedUser){
        throw new Error("User is already existed");
    }
    const salt = await bcrypt.genSalt(10)
    const hashPasswordPayload = await bcrypt.hash(payload.password,salt);
    const user = await prisma.user.create({
        data:{
            email: payload.email,
            hashPassword : hashPasswordPayload
        }
    })
    const JWTtoken = await genToken({userId:user.id,email:user.email})
    const {hashPassword,...returnUser} = user; 
    return {
        user: returnUser,
        token: JWTtoken
    }
}



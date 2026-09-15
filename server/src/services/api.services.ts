import crypto from "crypto";
import { prisma } from "../config/db.js";

type genKeyPayLoad = {
    userId: string
    name: string
}
type keyRespond = {
    apiKey: string
}
type validatePayload = {
    key: string
}
type ussageLogPayload = {
    apiKeyId :string
    endpoint : string
    status: number

}

const genAPIKey = (prefix:string) => {
    const secretKey = crypto.randomBytes(10).toString('hex');
    return `sk_${prefix.toLocaleLowerCase()}_${secretKey}`
}

const hashAPIKey = (rawKey: string) => {
    return crypto.createHash("sha256").update(rawKey).digest('hex');
}

export const genUserKey = async (payload: genKeyPayLoad): Promise<keyRespond> => {
    const userKey = genAPIKey(payload.name);
    const hashKey = hashAPIKey(userKey);
    const storeKey = await prisma.apiKey.create({
        data: {
            key: hashKey,
            name: payload.name,
            userId: payload.userId
        }
    })
    return { apiKey: userKey } 
} 

export const validateKey = async (payload : validatePayload)=>{
    const hashIncomingKey = hashAPIKey(payload.key);
    const activeKey = await prisma.apiKey.findUnique({
        where:{
            key: hashIncomingKey
        }
    })
    if(!activeKey){
        return false
    }
    if(!activeKey?.isActive){
        return false
    }
    return true
}

// const logAPIUsage = async (payload) =>{
//     const logging = await prisma.usageLog.create({});
// }
import type { User } from "../generated/prisma/client.js";

export interface userRespond {
    user : Omit<User, "hashPassword">
    token : string
}
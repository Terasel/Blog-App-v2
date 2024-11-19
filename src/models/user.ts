import { prisma } from "../database/dbconnection"
// import { Request, Response } from 'express'
import bcrypt from 'bcrypt'

interface userTemplate {
    id: number,
    name: string,
    password: string,
    email: string,
    role: string,
    banned: boolean
}

interface userCreated {
    email: string,
    name: string,
    password: string,
    role: string
}


export class userModel {
    static async createUser(userCreate: userCreated) {
        const hashedPassword = await bcrypt.hash(userCreate.password, 10)
        const hashedUser = { email: userCreate.email, name: userCreate.name, password: hashedPassword, role: userCreate.role }
        const newUser = await prisma.user.create({
            data: hashedUser,
        })

        return newUser
    }
    static async updateUser(userFind: userTemplate) {
        const userUpdate = await prisma.user.update({
            where: {
                id: +userFind.id
            },
            data: userFind
        })
        return userUpdate
    }
    static async getUsers() {
        const users = await prisma.user.findMany({})
        return users
    }
    static async banUser(userFind: userTemplate) {
        const userBan = await prisma.user.update({
            where: {
                id: +userFind.id,
                banned: false
            },
            data: {
                banned: true
            }
        })
        return userBan
    }
    static async getUser(userFind: userTemplate) {
        const specificUser = await prisma.user.findFirst({
            where: {
                id: +userFind.id
            }
        })
        return specificUser
    }
    static async unbanUser(userFind: userTemplate) {
        const userBan = await prisma.user.update({
            where: {
                id: +userFind.id,
                banned: true
            },
            data: {
                banned: false
            }
        })
        return userBan
    }
    static async loginUser(userFind: userTemplate) {
        const login = await prisma.user.findFirst({
            where: {
                email: userFind.email
            }
        })
        return login
    }
    static async deleteAllUsers() {
        const usersDelete = await prisma.user.deleteMany({})
        return usersDelete
    }
}
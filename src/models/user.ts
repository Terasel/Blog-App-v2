import { prisma } from "../database/dbconnection"
import { Request, Response } from 'express'
import bcrypt from 'bcrypt'

export class userModel {
    static async createUser(req: Request, res: Response) {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const hashedUser = { email: req.body.email, name: req.body.name, password: hashedPassword, role: req.body.role, banned: req.body.banned }
        const newUser = await prisma.user.create({
            data: hashedUser,
        })

        return newUser
    }
    static async updateUser(req: Request, res: Response) {
        const userUpdate = await prisma.user.update({
            where: {
                id: +req.params.id
            },
            data: req.body
        })
        return userUpdate
    }
    static async getUsers(req: Request, res: Response) {
        const users = await prisma.user.findMany({})
        return users
    }
    static async banUser(req: Request, res: Response) {
        const userBan = await prisma.user.update({
            where: {
                id: +req.params.id,
                banned: false
            },
            data: {
                banned: true
            }
        })
        return userBan
    }
    static async getUser(req: Request, res: Response) {
        const specificUser = await prisma.user.findFirst({
            where: {
                id: +req.params.id
            }
        })
        return specificUser
    }
    static async unbanUser(req: Request, res: Response) {
        const userBan = await prisma.user.update({
            where: {
                id: +req.params.id,
                banned: true
            },
            data: {
                banned: false
            }
        })
        return userBan
    }
    static async loginUser(req: Request, res: Response) {
        const login = await prisma.user.findFirst({
            where: {
                email: req.body.email
            }
        })
        return login
    }
    static async deleteAllUsers(req: Request, res: Response) {
        const usersDelete = await prisma.user.deleteMany({})
        return usersDelete
    }
}
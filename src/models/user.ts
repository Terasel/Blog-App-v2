import { prisma } from "../database/dbconnection"
import { Request, Response } from 'express'

export class userModel {
    static async createUser(req: Request, res: Response) {
        const newUser = await prisma.user.create({
            data: req.body,
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
    static async deleteAllUsers(req: Request, res: Response) {
        const usersDelete = await prisma.user.deleteMany({})
        return usersDelete
    }
}
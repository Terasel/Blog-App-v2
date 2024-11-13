import { prisma } from "../database/dbconnection"
import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'

export class blogModel {
    static async createBlog(req: Request, res: Response) {
        const newBlog = await prisma.blog.create({
            data: req.body
        })
        return newBlog
    }
    static async likeBlog(req: Request, res: Response) {
        const blogLike = await prisma.blog.update({
            where: {
                id: +req.params.id,
                liked: false
            },
            data: {
                liked: true,
                likeCounter: {
                    increment: 1
                }
            }
        })
        return blogLike
    }
    static async dislikeBlog(req: Request, res: Response) {
        const blogLike = await prisma.blog.update({
            where: {
                id: +req.params.id,
                liked: true
            },
            data: {
                liked: false,
                likeCounter: {
                    increment: -1
                }
            }
        })
        return blogLike
    }
    static async getBlogs(req: Request, res: Response) {
        const blogs = await prisma.blog.findMany({
            where: {
                deleted: false
            },
            orderBy: {
                createdAt: 'desc'
            }
        })
        return blogs
    }
    static async getBlog(req: Request, res: Response) {
        const specificBlog = await prisma.blog.findFirst({
            where: {
                id: +req.params.id
            }
        })
        return specificBlog
    }
    static async getAuthor(req: Request, res: Response) {
        const author = await prisma.user.findFirst({
            where: {
                id: +req.params.authorId
            }
        })
        return author
    }
    static async getBlogsByAuthor(req: Request, res: Response) {
        const token = req.cookies.access_token
        const authorBlogs = await prisma.blog.findMany({
            where: {
                authorId: token.id || +req.params.authorId
            },
            orderBy: {
                createdAt: 'desc'
            }
        })
        return authorBlogs
    }
    static async deleteBlog(req: Request, res: Response) {
        const blogDelete = await prisma.blog.update({
            where: {
                id: +req.params.id,
            },
            data: {
                deleted: true,
            }
        })
        return blogDelete
    }
    static async recoverBlog(req: Request, res: Response) {
        const blogRecover = await prisma.blog.update({
            where: {
                id: +req.params.id
            },
            data: {
                deleted: false
            }
        })
        return blogRecover
    }
    static async updateBlog(req: Request, res: Response) {
        const blogUpdate = await prisma.blog.update({
            where: {
                id: +req.params.id
            },
            data: req.body
        })
        return blogUpdate
    }
    static async actuallyDeleteBlog(req: Request, res: Response) {
        const blogFinalDelete = await prisma.blog.delete({
            where: {
                id: +req.params.id
            }
        })
        return blogFinalDelete
    }
    static async popularityScore(req: Request, res: Response) {
        const users = await prisma.user.findMany({})
        const usersLength = users.length
        const specificBlog = await prisma.blog.findFirst({
            where: {
                id: +req.params.id
            }
        })
        const likes = specificBlog!.likeCounter
        const popularity = (likes / (usersLength - 1)) * 100
        return popularity
    }
    static async increaseCounter(req: Request, res: Response) {
        const blogCounter = await prisma.blog.update({
            where: {
                id: +req.params.id
            },
            data: {
                likeCounter: {
                    increment: 1
                }
            }
        })
        return blogCounter
    }
    static async deleteAllBlogs(req: Request, res: Response) {
        const blogDelete = await prisma.blog.deleteMany({})
        return blogDelete
    }

    static async testing(req: Request, res: Response) {
        const users = await prisma.user.findMany({
            take: 1,
            orderBy: {
                id: 'desc',
            },
        })
        return users
    }
}
import { prisma } from "../database/dbconnection"

interface Requested {
    title: string,
    content: string,
    authorId: number,
    popularity: string
}

interface blogFind {
    id: string
}

interface authorFind {
    authorId: number
}

interface blogUpdate {
    title: string,
    content: string
}

interface likeCreate {
    blogId: number,
    userId: number
}



export class blogModel {
    static async createBlog(reqCreate: Requested) {

        const newBlog = await prisma.blog.create({
            data:
                { title: reqCreate.title, content: reqCreate.content, authorId: reqCreate.authorId, popularity: reqCreate.popularity }
        })
        return newBlog
    }
    static async getLike(reqLike: likeCreate) {
        const likeEntry = await prisma.likes.findFirst({
            where: {
                blogId: +reqLike.blogId,
                userId: +reqLike.userId
            }
        })
        return likeEntry
    }
    static async getLikes() {
        const likes = await prisma.likes.findMany({})
        return likes
    }
    static async likeBlog(reqLike: likeCreate) {
        const likeEntry = await prisma.likes.create({
            data: {
                blogId: +reqLike.blogId,
                userId: +reqLike.userId
            }
        })
        return likeEntry
    }
    static async dislikeBlog(reqLike: likeCreate) {
        const likeDelete = await prisma.likes.deleteMany({
            where: {
                blogId: +reqLike.blogId,
                userId: +reqLike.userId
            }
        })
        return likeDelete
    }
    static async deleteLikes(reqLike: blogFind) {
        const likeDelete = await prisma.likes.deleteMany({
            where: {
                blogId: +reqLike.id
            }
        })
        return likeDelete
    }
    static async getBlogs() {
        const blogs = await prisma.blog.findMany({
            where: {
                deleted: false
            },
            orderBy: {
                createdAt: 'desc'
            },
            select: {
                title: true,
                content: true,
                createdAt: true,
                updatedAt: true,
                popularity: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        })
        return blogs
    }
    static async getBlog(reqId: blogFind) {
        const specificBlog = await prisma.blog.findFirst({
            where: {
                id: +reqId.id
            },
            select: {
                title: true,
                content: true,
                createdAt: true,
                updatedAt: true,
                popularity: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        })
        return specificBlog
    }
    static async getAuthor(reqId: authorFind) {
        const author = await prisma.user.findFirst({
            where: {
                id: +reqId.authorId
            }
        })
        return author
    }
    static async getBlogsByAuthor(reqId: authorFind) {
        const authorBlogs = await prisma.blog.findMany({
            where: {
                authorId: +reqId.authorId
            },
            orderBy: {
                createdAt: 'desc'
            }
        })
        return authorBlogs
    }
    static async deleteBlog(reqId: blogFind) {
        const blogDelete = await prisma.blog.update({
            where: {
                id: +reqId.id,
            },
            data: {
                deleted: true,
            }
        })
        return blogDelete
    }
    static async recoverBlog(reqId: blogFind) {
        const blogRecover = await prisma.blog.update({
            where: {
                id: +reqId.id
            },
            data: {
                deleted: false
            }
        })
        return blogRecover
    }
    static async updateBlog(reqId: blogFind, reqUpdate: blogUpdate) {
        const blogUpdate = await prisma.blog.update({
            where: {
                id: +reqId.id
            },
            data: reqUpdate
        })
        return blogUpdate
    }
    static async actuallyDeleteBlog(reqId: blogFind) {
        const blogFinalDelete = await prisma.blog.delete({
            where: {
                id: +reqId.id
            }
        })
        return blogFinalDelete
    }
    static async popularityScore(reqId: blogFind) {
        const users = await prisma.user.findMany({})
        const usersLength = users.length
        const specificBlog = await prisma.blog.findFirst({
            where: {
                id: +reqId.id
            }
        })
        const likes = specificBlog!.likeCounter
        const popularity = (likes / (usersLength - 1)) * 100
        const popularityUpdate = await prisma.blog.update({
            where: {
                id: +reqId.id
            },
            data: {
                popularity: popularity + '%'
            }
        })
        return popularityUpdate
    }
    static async increaseCounter(reqId: blogFind) {
        const blogCounter = await prisma.blog.update({
            where: {
                id: +reqId.id
            },
            data: {
                likeCounter: {
                    increment: 1
                }
            }
        })
        return blogCounter
    }
    static async decreaseCounter(reqId: blogFind) {
        const blogCounter = await prisma.blog.update({
            where: {
                id: +reqId.id
            },
            data: {
                likeCounter: {
                    increment: -1
                }
            }
        })
        return blogCounter
    }
    static async deleteAllBlogs() {
        const blogDelete = await prisma.blog.deleteMany({})
        return blogDelete
    }

    static async deleteAllLikes() {
        const likeDelete = await prisma.likes.deleteMany({})
        return likeDelete
    }

    static async testing() {
        const users = await prisma.user.findMany({
            take: 1,
            orderBy: {
                id: 'desc',
            },
        })
        return users
    }
}
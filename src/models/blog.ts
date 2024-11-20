import { prisma } from "../database/dbconnection"

interface Requested {
    title: string,
    content: string,
    authorId: number
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



export class blogModel {
    static async createBlog(reqCreate: Requested) {

        const newBlog = await prisma.blog.create({
            data:
                { title: reqCreate.title, content: reqCreate.content, authorId: reqCreate.authorId }
        })
        return newBlog
    }
    // static async likeBlog(reqLike: RequestedLiked) {
    //     const blogLike = await prisma.blog.update({
    //         where: {
    //             id: +reqLike.id,
    //             liked: false
    //         },
    //         data: {
    //             liked: true,
    //             likeCounter: {
    //                 increment: 1
    //             }
    //         }
    //     })
    //     return blogLike
    // }
    // static async dislikeBlog(reqDislike: RequestedTwo) {
    //     const blogLike = await prisma.blog.update({
    //         where: {
    //             id: +reqDislike.id,
    //             liked: true
    //         },
    //         data: {
    //             liked: false,
    //             likeCounter: {
    //                 increment: -1
    //             }
    //         }
    //     })
    //     return blogLike
    // }
    static async getBlogs() {
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
    static async getBlog(reqId: blogFind) {
        const specificBlog = await prisma.blog.findFirst({
            where: {
                id: +reqId.id
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
        return popularity
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
    static async deleteAllBlogs() {
        const blogDelete = await prisma.blog.deleteMany({})
        return blogDelete
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
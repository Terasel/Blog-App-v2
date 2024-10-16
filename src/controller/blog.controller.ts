import { prisma } from "../infrastructure/dbconnection"
import { Request, Response } from 'express';

export const createBlog = async (req: Request, res: Response) => {
    try {
        const newBlog = await prisma.blog.create({
            data: req.body
        })
        if (!newBlog) throw 'Not created'
        res.status(201).send(newBlog)
    } catch (err) {
        if (err = 'Not created') res.status(400).send('This blog could not be created')
    }
}

export const likeBlog = async (req: Request, res: Response) => {
    try {
        try {
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
                },
            });
            if (!blogLike) throw 'Empty'
            res.status(200).send(blogLike);
        } catch {
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
                },
            });
            if (!blogLike) throw 'Empty'
            res.status(200).send(blogLike);
        }
    } catch (err) {
        if (err = 'Empty') res.status(400).send("This blog's liked status could not be updated");
    }
}

export const getBlogs = async (req: Request, res: Response) => {
    try {
        const blogs = await prisma.blog.findMany({
            where: {
                deleted: false
            }
        })
        if (!blogs) throw 'Empty'
        res.status(200).send(blogs)
    } catch (err) {
        if (err = 'Empty') res.status(404).send('No blogs could be found')
    }
}

export const getBlog = async (req: Request, res: Response) => {
    try {
        const specificBlog = await prisma.blog.findFirst({
            where: {
                id: +req.params.id
            }
        })
        if (!specificBlog) throw 'Empty'
        res.status(200).send(specificBlog)
    } catch (err) {
        if (err = 'Empty') res.status(404).send('This blog could not be found')
    }
}

export const getBlogsByAuthor = async (req: Request, res: Response) => {
    try {
        const authorBlogs = await prisma.blog.findMany({
            where: {
                authorId: +req.params.authorId
            }
        })
        if (!authorBlogs) throw 'Empty'
        res.status(200).send(authorBlogs)
    } catch (err) {
        if (err = 'Empty') res.status(404).send('This blog could not be found')
    }
}

export const deleteBlog = async (req: Request, res: Response) => {
    try {
        const blogDelete = await prisma.blog.update({
            where: {
                id: +req.params.id,
            },
            data: {
                deleted: true,
            }
        })
        if (!blogDelete) throw 'Empty'
        res.status(204).send(blogDelete)
    } catch (err) {
        if (err = 'Empty') res.status(400).send('This blog could not be deleted')
    }
}

export const updateBlog = async (req: Request, res: Response) => {
    try {
        const blogUpdate = await prisma.blog.update({
            where: {
                id: +req.params.id
            },
            data: req.body
        })
        if (!blogUpdate) throw 'Empty'
        res.status(200).send(blogUpdate)
    } catch (err) {
        if (err = 'Empty') res.status(400).send('This blog could not be updated')
    }
}

export const recoverBlog = async (req: Request, res: Response) => {
    try {
        const blogRecover = await prisma.blog.update({
            where: {
                id: +req.params.id
            },
            data: {
                deleted: false
            }
        })
        if (!blogRecover) throw 'Empty'
        res.status(200).send(blogRecover)
    } catch (err) {
        if (err = 'Empty') res.status(400).send('This blog could not be recovered')
    }
}

export const actuallyDeleteBlog = async (req: Request, res: Response) => {
    try {
        const blogFinalDelete = await prisma.blog.delete({
            where: {
                id: +req.params.id
            }
        })
        if (!blogFinalDelete) throw 'Undeletable'
        res.status(204).send(blogFinalDelete)
    } catch (err) {
        if (err = 'Undeletable') res.status(400).send('This blog could not be completely deleted')
    }
}

export const increaseCounter = async (req: Request, res: Response) => {
    try {
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
        if (!blogCounter) throw 'Empty'
        res.status(200).send(blogCounter)
    } catch (err) {
        if (err = 'Empty') res.status(400).send('This blog could not be updated')
    }
}

export const deleteAllBlogs = async (req: Request, res: Response) => {
    try {
        const blogDelete = await prisma.blog.deleteMany({})
        if (!blogDelete) throw 'Undeletable'
        res.status(204).send(blogDelete)
    } catch (err) {
        if (err = 'Undeletable') res.status(400).send('The blog could not be deleted')
    }
}
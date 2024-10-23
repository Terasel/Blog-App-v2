import { prisma } from "../database/dbconnection"
import { Handler } from 'express';

export const createBlog: Handler = async (req, res) => {
    try {
        const newBlog = await prisma.blog.create({
            data: req.body
        })
        if (!newBlog) throw 'Not created'
        res.status(201).send(newBlog)
    } catch (err) {
        if (err = 'Not created') res.status(422).send('This blog could not be created')
    }
}

export const likeBlog: Handler = async (req, res) => {
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

export const getBlogs: Handler = async (req, res) => {
    try {
        const blogs = await prisma.blog.findMany({
            where: {
                deleted: false
            },
            orderBy: {
                createdAt: 'desc'
            }
        })
        if (!blogs) throw 'Empty'
        res.status(200).send(blogs)
    } catch (err) {
        if (err = 'Empty') res.status(404).send('No blogs could be found')
    }
}

export const getBlog: Handler = async (req, res) => {
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

export const getBlogsByAuthor: Handler = async (req, res) => {
    try {
        const authorBlogs = await prisma.blog.findMany({
            where: {
                authorId: +req.params.authorId
            }
        })
        if (!authorBlogs) throw 'Empty'
        res.status(200).send(authorBlogs)
    } catch (err) {
        if (err = 'Empty') res.status(404).send('No blogs from this author could be found')
        if (err = 'No blogs') res.status(404).send('This author has no blogs')
    }
}

export const deleteBlog: Handler = async (req, res) => {
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

export const recoverBlog: Handler = async (req, res) => {
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

export const updateBlog: Handler = async (req, res) => {
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

export const actuallyDeleteBlog: Handler = async (req, res) => {
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

export const popularityScore: Handler = async (req, res) => {
    try {
        const users = await prisma.user.findMany({})
        const usersLength = users.length
        const specificBlog = await prisma.blog.findFirst({
            where: {
                id: +req.params.id
            }
        })
        const likes = specificBlog!.likeCounter
        const popularity = (likes / (usersLength - 1)) * 100
        if (!specificBlog) throw 'No blog'
        res.status(200).send(popularity + '%')
    } catch (err) {
        if (err = 'No blog') res.status(404).send('This blog could not be found')
    }
}
// - - - - - - - -
export const increaseCounter: Handler = async (req, res) => {
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

export const deleteAllBlogs: Handler = async (req, res) => {
    try {
        const blogDelete = await prisma.blog.deleteMany({})
        if (!blogDelete) throw 'Undeletable'
        res.status(204).send(blogDelete)
    } catch (err) {
        if (err = 'Undeletable') res.status(400).send('The blog could not be deleted')
    }
}

export const testing: Handler = async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            take: 1,
            orderBy: {
                id: 'desc',
            },
        })
        res.status(200).send(users)
    } catch (err) {
        res.status(400).send('The testing did not work')
    }
}

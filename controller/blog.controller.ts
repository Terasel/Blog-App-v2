import { Router } from "express";
import { prisma } from "../infrastructure/dbconnection"
import { blogs } from "../infrastructure/blog.services"

const router = Router();

// simpleUser
router.post('/blog', async (req, res) => {
    try {
        const newBlog = await prisma.blog.create({
            data: req.body
        })
        if (!newBlog) throw 'Not created'
        res.status(201).send(newBlog)
    } catch (err) {
        if (err = 'Not created') res.status(400).send('This blog could not be created')
    }
})

router.patch('/blog/:id/liked', async (req, res) => {
    try {
        try {
            const blogLike = await prisma.blog.update({
                where: {
                    id: +req.params.id,
                    liked: false
                },
                data: {
                    liked: true,
                },
            });
            res.status(200).send(blogLike);
        } catch {
            const blogLike = await prisma.blog.update({
                where: {
                    id: +req.params.id,
                    liked: true
                },
                data: {
                    liked: false,
                },
            });
            res.status(200).send(blogLike);
        }
    } catch (error) {
        res.status(400).send("This blog's liked status could not be updated");
    }
})

router.get('/blog', async (req, res) => {
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
})

router.get('/blog/:id', async (req, res) => {
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
})

router.get('/blog/:authorId/byauthor', async (req, res) => {
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
})

router.delete('/blog/:id', async (req, res) => {
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
})

router.put('/blog/:id', async (req, res) => {
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
})

router.patch('/blog/:id/recover', async (req, res) => {
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
})

// admin
export default router
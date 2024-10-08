import { Router } from "express";
import { prisma } from "../infrastructure/dbconnection"

const router = Router();

router.get('/blog', async (req, res) => {
    const blogs = await prisma.blog.findMany()
    res.json(blogs)
});

router.get('/blog/:id', async (req, res) => {
    const specificBlog = await prisma.blog.findFirst({
        where: {
            id: +req.params.id,
        },
    });
    if (!specificBlog) res.status(404).send('Product not found');
    else res.send(specificBlog);
});

router.post('/blog', async (req, res) => {
    const newBlog = await prisma.blog.create({
        data: req.body,
    });
    res.json(newBlog)
});

router.put('/blog/:id', async (req, res) => {
    const blogUpdate = await prisma.blog.update({
        where: {
            id: +req.params.id
        },
        data: req.body
    })
    res.send(blogUpdate)
})


export default router;
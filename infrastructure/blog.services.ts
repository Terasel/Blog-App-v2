import { prisma } from "./dbconnection"
import { Request, Response } from 'express';

const newBlog = async (req: Request, res: Response) => {
    await prisma.blog.create({
        data: req.body
    })
}
if (!newBlog) throw 'Not created'

export const blogs = async (req: Request, res: Response) => {
    await prisma.blog.findMany({
        where: {
            deleted: false
        }
    })

    if (!blogs) throw 'Empty'
}



const blogDelete = async (req: Request, res: Response) => {
    await prisma.blog.update({
        where: {
            id: +req.params.id,
        },
        data: {
            deleted: true,
        }
    })
}
if (!blogDelete) throw 'Empty'
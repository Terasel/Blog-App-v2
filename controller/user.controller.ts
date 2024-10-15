import { prisma } from "../infrastructure/dbconnection"
import { Request, Response } from 'express';

export const createUser = async (req: Request, res: Response) => {
    try {
        const newUser = await prisma.user.create({
            data: req.body,
        })
        if (!newUser) throw 'Not created'
        res.status(201).send(newUser)
    } catch (err) {
        if (err = 'Not created') res.status(422).send('This user could not be created')
    }
}
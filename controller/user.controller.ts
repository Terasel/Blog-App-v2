import { Router } from "express";
import { prisma } from "../infrastructure/dbconnection"

const router = Router();

// simpleUser
router.post('/users', async (req, res) => {
    try {
        const newUser = await prisma.user.create({
            data: req.body,
        })
        if (!newUser) throw 'Not created'
        res.status(201).send(newUser)
    } catch (err) {
        if (err = 'Not created') res.status(422).send('This user could not be created')
    }
})

router.put('/users/:id', async (req, res) => {
    try {
        const userUpdate = await prisma.user.update({
            where: {
                id: +req.params.id
            },
            data: req.body
        })
        if (!userUpdate) throw 'Empty'
        res.status(200).send(userUpdate)
    } catch (err) {
        if (err = 'Empty') res.status(404).send('This user does not exist')
    }
})

router.get('/users', async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            where: {
                banned: false
            }
        })
        if (!users) throw 'No users'
        res.status(200).send(users);
    } catch (err) {
        if (err = 'No users') res.status(404).send('There are no users')
    }
})

//admin

router.patch('/users/:id/ban', async (req, res) => {
    try {
        const userBan = await prisma.user.update({
            where: {
                id: +req.params.id,
            },
            data: {
                banned: true,
            }
        })
        if (!userBan) throw 'Empty'
        res.status(204).send(userBan)
    } catch (err) {
        if (err = 'Empty') res.status(404).send('This user does not exist')
    }
})

router.patch('/users/:id/unban', async (req, res) => {
    try {
        const userUnban = await prisma.user.update({
            where: {
                id: +req.params.id
            },
            data: {
                banned: false
            }
        })
        if (!userUnban) throw 'Empty'
        res.status(200).send(userUnban)
    } catch (err) {
        if (err = 'Empty') res.status(404).send('This user does not exist')
    }
})

export default router;
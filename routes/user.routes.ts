import { Router } from "express";
import { prisma } from "../infrastructure/dbconnection"
import { createUser } from '../controller/user.controller'

const router = Router();

// simpleUser
router.post('/users', createUser)

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
        if (err = 'Empty') res.status(400).send('This user could not be updated')
    }
})

//admin

router.get('/users', async (req, res) => {
    try {
        const users = await prisma.user.findMany({})
        if (!users) throw 'No users'
        res.status(200).send(users);
    } catch (err) {
        if (err = 'No users') res.status(404).send('No users could be found')
    }
})

router.patch('/users/:id/ban', async (req, res) => {
    try {
        try {
            const userBan = await prisma.user.update({
                where: {
                    id: +req.params.id,
                    banned: false
                },
                data: {
                    banned: true
                }
            })
            if (!userBan) throw 'Empty'
            res.status(200).send(userBan)
        } catch {
            const userBan = await prisma.user.update({
                where: {
                    id: +req.params.id,
                    banned: true
                },
                data: {
                    banned: false
                }
            })
            if (!userBan) throw 'Empty'
            res.status(200).send(userBan)
        }
    } catch (err) {
        if (err = 'Empty') res.status(400).send('This user could not be banned')
    }

})

export default router;
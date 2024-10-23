import { prisma } from "../database/dbconnection"
import { Handler } from 'express';

export const createUser: Handler = async (req, res) => {
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

export const updateUser: Handler = async (req, res) => {
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
}

export const getUsers: Handler = async (req, res) => {
    try {
        const users = await prisma.user.findMany({})
        if (!users) throw 'No users'
        res.status(200).send(users);
    } catch (err) {
        if (err = 'No users') res.status(404).send('No users could be found')
    }
}

export const banUser: Handler = async (req, res) => {
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
        if (err = 'Empty') res.status(400).send('This user could not be banned/unbanned')
    }

}
// - - - - - - - -
export const deleteAllUsers: Handler = async (req, res) => {
    try {
        const usersDelete = await prisma.user.deleteMany({})
        if (!usersDelete) throw 'Undeletable'
        res.status(204).send(usersDelete)
    } catch (err) {
        if (err = 'Undeletable') res.status(400).send('The users could not be deleted')
    }
}
import { Handler } from 'express'
import { userModel } from '../models/user'

export const createUser: Handler = async (req, res) => {
    try {
        const newUser = await userModel.createUser(req, res)
        if (!newUser) throw 'Not created'
        res.status(201).send(newUser)
    } catch (err) {
        if (err = 'Not created') res.status(422).send('This user could not be created')
    }
}

export const updateUser: Handler = async (req, res) => {
    try {
        const user = await userModel.getUser(req, res)
        if (!user) throw 'No user'
        const userUpdate = await userModel.updateUser(req, res)
        if (!userUpdate) throw 'Empty'
        res.status(200).send(userUpdate)
    } catch (err) {
        if (err = 'No user') res.status(404).send('This user could not be found')
        else if (err = 'Empty') res.status(400).send('This user could not be updated')
    }
}

export const getUsers: Handler = async (req, res) => {
    try {
        const users = await userModel.getUsers(req, res)
        if (!users) throw 'No users'
        res.status(200).send(users)
    } catch (err) {
        if (err = 'No users') res.status(404).send('No users could be found')
    }
}

export const banUser: Handler = async (req, res) => {
    try {
        try {
            const userBan = await userModel.banUser(req, res)
            if (!userBan) throw 'Empty'
            res.status(200).send(userBan)
        } catch {
            const userBan = await userModel.unbanUser(req, res)
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
        const usersDelete = await userModel.deleteAllUsers(req, res)
        if (!usersDelete) throw 'Undeletable'
        res.status(204).send(usersDelete)
    } catch (err) {
        if (err = 'Undeletable') res.status(400).send('The users could not be deleted')
    }
}
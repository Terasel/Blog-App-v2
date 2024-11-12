import { Handler } from 'express'
import { userModel } from '../models/user'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

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
        const userBan = await userModel.banUser(req, res)
        if (!userBan) throw 'Empty'
        res.status(200).send(userBan)
    } catch (err) {
        if (err = 'Empty') res.status(400).send('This user could not be banned')
    }
}

export const unbanUser: Handler = async (req, res) => {
    try {
        const userBan = await userModel.unbanUser(req, res)
        if (!userBan) throw 'Empty'
        res.status(200).send(userBan)
    } catch (err) {
        if (err = 'Empty') res.status(400).send('This user could not be unbanned')
    }
}

export const loginUser: Handler = async (req, res) => {
    try {
        const userLogin = await userModel.loginUser(req, res)
        const isValid = await bcrypt.compare(req.body.password, userLogin!.password)
        if (!isValid) throw 'Invalid'
        const token = jwt.sign(
            { id: userLogin?.id, name: userLogin?.name, email: userLogin?.email, role: userLogin?.role },
            process.env.SECRET_JWT_KEY!,
            {
                expiresIn: '1h'
            })
        console.log(token)
        res.status(200)
            .cookie('access_token', token, { httpOnly: true })
            .send({ email: userLogin!.email })
    } catch (err) {
        if (err = 'Invalid') res.status(400).send('The password is incorrect')
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
import { Handler } from 'express'
import { userModel } from '../models/user'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

interface userCreated {
    email: string,
    name: string,
    password: string,
    role: string
}

interface userTemplate {
    id: number,
    name: string,
    password: string,
    email: string,
    role: string,
    banned: boolean
}


export const createUser: Handler = async (req, res) => {
    try {
        const user: userCreated = { email: req.body.email, name: req.body.name, password: req.body.password, role: req.body.role }
        const newUser = await userModel.createUser(user)
        if (!newUser) throw 'Not created'
        res.status(201).send(newUser)
    } catch (err) {
        if (err = 'Not created') res.status(422).send('This user could not be created')
    }
}

export const updateUser: Handler = async (req, res) => {
    try {
        const userC: userTemplate = { id: req.body.id, email: req.body.email, name: req.body.name, password: req.body.password, role: req.body.role, banned: req.body.banned }
        const user = await userModel.getUser(userC)
        if (!user) throw 'No user'
        const userUpdate = await userModel.updateUser(userC)
        if (!userUpdate) throw 'Empty'
        res.status(200).send(userUpdate)
    } catch (err) {
        if (err = 'No user') res.status(404).send('This user could not be found')
        else if (err = 'Empty') res.status(400).send('This user could not be updated')
    }
}

export const getUsers: Handler = async (req, res) => {
    try {
        const users = await userModel.getUsers()
        if (!users) throw 'No users'
        res.status(200).send(users)
    } catch (err) {
        if (err = 'No users') res.status(404).send('No users could be found')
    }
}

export const banUser: Handler = async (req, res) => {
    try {
        const userC: userTemplate = { id: req.body.id, email: req.body.email, name: req.body.name, password: req.body.password, role: req.body.role, banned: req.body.banned }
        const userBan = await userModel.banUser(userC)
        if (!userBan) throw 'Empty'
        res.status(200).send(userBan)
    } catch (err) {
        if (err = 'Empty') res.status(400).send('This user could not be banned')
    }
}

export const unbanUser: Handler = async (req, res) => {
    try {
        const userC: userTemplate = { id: req.body.id, email: req.body.email, name: req.body.name, password: req.body.password, role: req.body.role, banned: req.body.banned }
        const userBan = await userModel.unbanUser(userC)
        if (!userBan) throw 'Empty'
        res.status(200).send(userBan)
    } catch (err) {
        if (err = 'Empty') res.status(400).send('This user could not be unbanned')
    }
}

export const loginUser: Handler = async (req, res) => {
    try {
        const userC: userTemplate = { id: req.body.id, email: req.body.email, name: req.body.name, password: req.body.password, role: req.body.role, banned: req.body.banned }
        const userLogin = await userModel.loginUser(userC)
        const isValid = await bcrypt.compare(req.body.password, userLogin!.password)
        if (!isValid) throw 'Invalid'
        const token = jwt.sign(
            { id: userLogin?.id, name: userLogin?.name, email: userLogin?.email, role: userLogin?.role },
            process.env.SECRET_JWT_KEY!,
            {
                expiresIn: '1h'
            })
        res
            .cookie('access_token', token, { httpOnly: true, secure: false })
            .status(200)
            .send({ email: userLogin!.email })
    } catch (err) {
        if (err = 'Invalid') res.status(400).send('The password and/or email address is incorrect')
    }
}

export const logoutUser: Handler = async (req, res) => {
    res
        .clearCookie('access_token')
        .status(200)
        .send('Logout successful')
}
// - - - - - - - -
export const deleteAllUsers: Handler = async (req, res) => {
    try {
        const usersDelete = await userModel.deleteAllUsers()
        if (!usersDelete) throw 'Undeletable'
        res.status(204).send(usersDelete)
    } catch (err) {
        if (err = 'Undeletable') res.status(400).send('The users could not be deleted')
    }
}
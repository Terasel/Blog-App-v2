import { Handler } from 'express'
import { userModel } from '../models/user'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

interface JwtPayload {
    id: number,
    name: string,
    email: string,
    role: string
}

interface userCreated {
    email: string,
    name: string,
    password: string,
    role: string
}

interface userTemplate {
    id: string,
    name: string,
    password: string,
    email: string,
    role: string,
    banned: boolean
}

interface userUpdate {
    name: string,
    email: string
}

interface userFind {
    id: string
}

export const createUser: Handler = async (req, res) => {
    try {
        const user: userCreated = { email: req.body.email, name: req.body.name, password: req.body.password, role: req.body.role }
        const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        if (!user.email.match(validRegex)) throw 'Invalid email'
        if (typeof user.name != 'string') throw 'Invalid name'
        if (typeof user.password != 'string') throw 'Invalid password'
        if (user.role != 'admin' && user.role != 'simpleUser') throw 'Invalid user role'
        const newUser = await userModel.createUser(user)
        if (!newUser) throw 'Not created'
        res.status(201).send(newUser)
    } catch (err) {
        if (err == 'Invalid email') res.status(400).send('This email is invalid')
        if (err == 'Invalid name') res.status(400).send('This user name is invalid')
        if (err == 'Invalid password') res.status(400).send('This password is invalid')
        if (err == 'Invalid user role') res.status(400).send('This user role is invalid')
        if (err == 'Not created') res.status(422).send('This user could not be created')
    }
}

export const updateUser: Handler = async (req, res) => {
    try {
        const userC: userFind = { id: req.params.id }
        if (userC.id == null) throw 'No ID'
        const user = await userModel.getUser(userC)
        if (!user) throw 'No user'
        const userU: userUpdate = { name: req.body.name, email: req.body.email }
        const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        if (!userU.email.match(validRegex)) throw 'Invalid email'
        if (typeof userU.name != 'string') throw 'Invalid name'
        const userUpdate = await userModel.updateUser(userC, userU)
        if (!userUpdate) throw 'Empty'
        res.status(200).send(userUpdate)
    } catch (err) {
        if (err == 'No ID') res.status(400).send('No ID is being sent')
        if (err == 'No user') res.status(404).send('This user could not be found')
        if (err == 'Invalid email') res.status(400).send('This email is invalid')
        if (err == 'Invalid name') res.status(400).send('This user name is invalid')
        else if (err == 'Empty') res.status(400).send('This user could not be updated')
    }
}

export const getUsers: Handler = async (req, res) => {
    try {
        const token = req.cookies.access_token
        if (!token) throw 'No cookie/token'
        const decoded = jwt.verify(token, process.env.SECRET_JWT_KEY!) as JwtPayload
        if (decoded.role == 'simpleUser') throw 'Unauthorized'
        const users = await userModel.getUsers()
        if (!users) throw 'No users'
        res.status(200).send(users)
    } catch (err) {
        if (err == 'No cookie/token') res.status(400).send('There is no cookie or token')
        if (err == 'Unauthorized') res.status(401).send('The user does not have the necessary access level')
        if (err == 'No users') res.status(404).send('No users could be found')
    }
}

export const banUser: Handler = async (req, res) => {
    try {
        const token = req.cookies.access_token
        if (!token) throw 'No cookie/token'
        const decoded = jwt.verify(token, process.env.SECRET_JWT_KEY!) as JwtPayload
        if (decoded.role == 'simpleUser') throw 'Unauthorized'
        const userC: userFind = { id: req.params.id }
        if (userC.id == null) throw 'No ID'
        const user = await userModel.getUser(userC)
        if (!user) throw 'No user'
        if (user.banned == true) throw ('Already banned')
        const userBan = await userModel.banUser(userC)
        if (!userBan) throw 'Empty'
        res.status(200).send(userBan)
    } catch (err) {
        if (err == 'No cookie/token') res.status(400).send('There is no cookie or token')
        if (err == 'Unauthorized') res.status(401).send('The user does not have the necessary access level')
        if (err == 'No ID') res.status(400).send('No ID is being sent')
        if (err == 'No user') res.status(404).send('This user could not be found')
        if (err == 'Already banned') res.status(400).send('This user is already banned')
        if (err == 'Empty') res.status(400).send('This user could not be banned')
    }
}

export const unbanUser: Handler = async (req, res) => {
    try {
        const token = req.cookies.access_token
        if (!token) throw 'No cookie/token'
        const decoded = jwt.verify(token, process.env.SECRET_JWT_KEY!) as JwtPayload
        if (decoded.role == 'simpleUser') throw 'Unauthorized'
        const userC: userFind = { id: req.params.id }
        if (userC.id == null) throw 'No ID'
        const user = await userModel.getUser(userC)
        if (!user) throw 'No user'
        if (user.banned == false) throw ('Already unbanned')
        const userBan = await userModel.unbanUser(userC)
        if (!userBan) throw 'Empty'
        res.status(200).send(userBan)
    } catch (err) {
        if (err == 'No cookie/token') res.status(400).send('There is no cookie or token')
        if (err == 'Unauthorized') res.status(401).send('The user does not have the necessary access level')
        if (err == 'No ID') res.status(400).send('No ID is being sent')
        if (err == 'No user') res.status(404).send('This user could not be found')
        if (err == 'Already unbanned') res.status(400).send('This user is not banned')
        if (err == 'Empty') res.status(400).send('This user could not be unbanned')
    }
}

export const loginUser: Handler = async (req, res) => {
    try {
        const userC: userTemplate = { id: req.body.id, email: req.body.email, name: req.body.name, password: req.body.password, role: req.body.role, banned: req.body.banned }
        const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        if (!userC.email.match(validRegex)) throw 'Invalid email'
        if (typeof userC.password != 'string') throw 'Invalid password'
        const userLogin = await userModel.loginUser(userC)
        const isValid = await bcrypt.compare(req.body.password, userLogin!.password)
        if (!isValid) throw 'Invalid'
        const token = jwt.sign(
            { id: userLogin?.id, name: userLogin?.name, email: userLogin?.email, role: userLogin?.role },
            process.env.SECRET_JWT_KEY!,
            {
                expiresIn: '1h'
            })
        if (!token) throw 'No token'
        res
            .cookie('access_token', token, { httpOnly: true, secure: false })
            .status(200)
            .send('User successfully logged in')
    } catch (err) {
        if (err == 'Invalid email') res.status(400).send('This email is invalid')
        if (err == 'Invalid password') res.status(400).send('This password is invalid')
        if (err == 'Invalid') res.status(400).send('The password is incorrect')
        if (err == 'No token') res.status(400).send('The token has not been created')
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
        res.status(204).send('The users were deleted correctly')
    } catch (err) {
        if (err == 'Undeletable') res.status(400).send('The users could not be deleted')
    }
}
import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

interface JwtPayload {
    id: number,
    name: string,
    email: string,
    role: string
}

interface userFind {
    id: string
}

interface userCreated {
    email: string,
    name: string,
    password: string,
    role: string
}

interface userUpdate {
    name: string,
    email: string
}

interface userTemplate {
    id: string,
    name: string,
    password: string,
    email: string,
    role: string,
    banned: boolean
}

export const TokenMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.access_token
        if (!token) throw 'No cookie/token'
        next()
    } catch (err) {
        if (err == 'No cookie/token') res.status(400).send('There is no cookie or token')
    }
}

export const RoleMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.access_token
        const decoded = jwt.verify(token, process.env.SECRET_JWT_KEY!) as JwtPayload
        if (decoded.role == 'simpleUser') throw 'Unauthorized'
        next()
    } catch (err) {
        if (err == 'Unauthorized') res.status(401).send('The user does not have the necessary access level')
    }
}

export const UserIdMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const userC: userFind = { id: req.params.id }
        if (userC.id == null) throw 'No ID'
        next()
    } catch (err) {
        if (err == 'No ID') res.status(400).send('No ID is being sent')
    }
}

export const CreateUserMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const user: userCreated = { email: req.body.email, name: req.body.name, password: req.body.password, role: req.body.role }
        const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        if ((typeof user.email != 'string') || (!user.email.match(validRegex))) throw 'Invalid email'
        if (typeof user.name != 'string') throw 'Invalid name'
        if (typeof user.password != 'string') throw 'Invalid password'
        if (user.role != 'admin' && user.role != 'simpleUser') throw 'Invalid user role'
        next()
    } catch (err) {
        if (err == 'Invalid email') res.status(400).send('This email is invalid')
        if (err == 'Invalid name') res.status(400).send('This user name is invalid')
        if (err == 'Invalid password') res.status(400).send('This password is invalid')
        if (err == 'Invalid user role') res.status(400).send('This user role is invalid')
    }
}

export const UpdateUserMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const userU: userUpdate = { name: req.body.name, email: req.body.email }
        const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        if ((typeof userU.email != 'string') || ((userU.email != '') && (!userU.email.match(validRegex)))) throw 'Invalid email'
        if ((typeof userU.name != 'string') && (userU.name != '')) throw 'Invalid name'
        next()
    } catch (err) {
        if (err == 'Invalid email') res.status(400).send('This email is invalid')
        if (err == 'Invalid name') res.status(400).send('This user name is invalid')
    }
}

export const LoginUserMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const userC: userTemplate = { id: req.body.id, email: req.body.email, name: req.body.name, password: req.body.password, role: req.body.role, banned: req.body.banned }
        const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        if ((typeof userC.email != 'string') || (!userC.email.match(validRegex))) throw 'Invalid email'
        if (typeof userC.password != 'string') throw 'Invalid password'
        next()
    } catch (err) {
        if (err == 'Invalid email') res.status(400).send('This email is invalid')
        if (err == 'Invalid password') res.status(400).send('This password is invalid')
    }
}
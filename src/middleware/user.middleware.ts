import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

interface JwtPayload {
    id: number,
    name: string,
    email: string,
    role: string
}

export const TokenMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.access_token
        if (!token) throw 'No cookie/token'
        next()
    } catch (err) {
        if (err == 'No cookie/token') res.status(400).send('There is no cookie or token')
    }
};

export const RoleMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.access_token
        const decoded = jwt.verify(token, process.env.SECRET_JWT_KEY!) as JwtPayload
        if (decoded.role == 'simpleUser') throw 'Unauthorized'
        next()
    } catch (err) {
        if (err == 'Unauthorized') res.status(401).send('The user does not have the necessary access level')
    }
};